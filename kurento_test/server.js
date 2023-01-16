// 1. Signalling
const express = require('express')
const app = express()
let http = require('http').Server(app)
let minimist = require('minimist')
let io = require('socket.io')(http)
// 2. Creating a Room and getting Kurento Client
const kurento = require('kurento-client')
let kurentoClient = null
// 3. Creating Outgoing WebRTC Endpoint
let iceCandidateQueues = {}

const { pipeline } = require("stream")


// 1. Signalling ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
let argv = minimist(process.argv.slice(2), {
    default: {
        as_uri: 'http://localhost:3000',
        ws_uri: 'ws://localhost:8888/kurento'
    }
})

io.on('connection', socket => {
    console.log("connected...")
    socket.on('message', message => {
        switch(message.event){
            case 'joinRoom':
                console.log("joinRoom...")
                joinRoom(socket, message.userName, message.roomName, err => {
                    if(err) {
                        console.log(err)
                    }
                })
                console.log("joinRoom the end...")
                break
            case 'receiveVideoFrom':
                console.log("receiveVideoFrom...")
                receiveVideoFrom(socket, message.userid, message.roomName, message.sdpOffer, err => {
                    if(err) {
                        console.log(err)
                    }
                })
                break
            case 'candidate':
                addIceCandidate(socket, message.userid, message.roomName, message.candidate, err => {
                    if(err) {
                        console.log(err)
                    }
                })
                break
        }
    })
})
// 3. Creating Outgoing WebRTC Endpoint ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function joinRoom(socket, username, roomname, callback) {
    // XX
    socket.emit('message', {
        event: 'XX(out)',
    })
    console.log("xx", socket.connect)//
    // XX
    getRoom(socket, roomname, (err, myRoom) => { // roomName (X), roomname (O)!!
        if (err) {
            return callback(err)
        }
        // XX
        socket.emit('message', {
            event: 'XX(in)',
        })
        // XX
        console.log("get room...")
        myRoom.pipeline.create('WebRtcEndPoint', (err, outgoingMedia) => {
            if (err) {
                return callback(err)
            }
            // creates user
            let user = {
                id: socket.id,
                name: username,
                outgoingMedia: outgoingMedia,
                incomingMedia: {}
            }

            let iceCandidateQueue = iceCandidateQueues[user.id]
            if (iceCandidateQueue) {
                while (iceCandidateQueue.length) {
                    let ice = iceCandidateQueue.shift()
                    console.log(`user: ${user.name} collect candidate for outgoing media`);
                    user.outgoingMedia.addIceCandidate(ice.candidate)
                }
            }

            user.outgoingMedia.on('OnIceCandidate', event => {
                let candidate = kurento.register.complexTypes.IceCandidate(event.candidate)
                socket.emit('message', {
                    event: 'candidate',
                    userid: user.id,
                    candidate: candidate
                })
            })

            socket.to(roomname).emit('message', {
                event: 'newParticipantArrived',
                userid: user.id,
                username: user.name
            })

            let existingUsers = []
            for (let i in myRoom.participants) {
                if (myRoom.participants[i].id != user.id) {
                    existingUsers.push({
                        id: myRoom.participants[i].id,
                        name: myRoom.participants[i].name
                    })
                }
            }

            socket.emit('message', {
                event: 'existingParticipants',
                existingUsers: existingUsers,
                userid: user.id
            })

            myRoom.participants[user.id] = user
        })
    })
}
// 2. Creating a Room and getting Kurento Client ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getKurentoClient(callback) {
    console.log("2. Creating a Room and getting Kurento Client")
    if (kurentoClient !== null) {
        return callback(null, kurentoClient)
    }

    kurento(argv.ws_uri, (err, _kurentoClient) => {
        if (err) {
            console.log(err)
            return callback(err)
        }
        kurentoClient = _kurentoClient
        callback(null, kurentoClient)
    })
}

function getRoom(socket, roomname, callback) {
    let myRoom = io.sockets.adapter.rooms[roomname] || {length: 0}
    let numClients = myRoom.length
    console.log("function getRoom...")
    if (numClients == 0) {
        console.log("function getRoom...if numClients == 0 ...")
        socket.join(roomname, () => {
            myRoom = io.sockets.adapter.rooms[roomname]
            getKurentoClient((err, kurento) => {
                kurento.create('MediaPipeline', (err, pipeline) => {
                    myRoom.pipeline = pipeline
                    myRoom.participants = {}
                    callback(null, myRoom)
                })
            })
        })
        console.log("function getRoom...if numClients == 0 ...end")
    }
    else {
        console.log("function getRoom...else...")
        socket.join(roomname)
        callback(null, myRoom)
    }
}
// 5. Connecting Endpoints (Lab 6 7) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getEndpointForUser(socket, roomname, senderid, callback){
    let myRoom = io.sockets.adapter.rooms[roomname]
    let asker = myRoom.participants[socket.id]
    let sender = myRoom.participants[senderid]

    if(asker.id === sender.id){
        return callback(null, asker.outgoingMedia)
    }

    if(asker.incomingMedia[sender.id]){
        sender.outgoingMedia.connect(asker.incomingMedia[sender.id], err => {
            if(err) return callback(err)
            callback(null, asker.incomingMedia[sender.id])
        })
    } else {
        //
        myRoom.pipeline.create('WebRtcEndPoint', (err, incoming) => {
            if (err) {
                return callback(err)
            }

            asker.incomingMedia[sender.id] = incoming

            let iceCandidateQueue = iceCandidateQueues[sender.id]
            if (iceCandidateQueue) {
                while (iceCandidateQueue.length) {
                    let ice = iceCandidateQueue.shift()
                    user.incomingMedia.addIceCandidate(ice.candidate)
                }
            }

            user.incomingMedia.on('OnIceCandidate', event => {
                let candidate = kurento.register.complexTypes.IceCandidate(event.candidate)
                socket.emit('message', {
                    event: 'candidate',
                    userid: sender.id,
                    candidate: candidate
                })
            })

            sender.outgoingMedia.connect(incoming, err => {
                if(err) return callback(err)
                callback(null, incoming)
            })
           
        })
    }
}

function receiveVideoFrom(socket, userid, roomName, sdpOffer, callback){
    getEndpointForUser(socket, roomName, userid, (err, endpoint) => {
        if(err) return callback(err)

        endpoint.processOffer(sdpOffer, (err, sdpAnswer) => {
            if(err) return callback(err)

            socket.emit('message', {
                event: 'receiveVideoAnswer',
                senderid: userid,
                sdpAnswer: sdpAnswer
            })

            endpoint.gatherCandidates(err => {
                if(err) return callback(err)
            })
        })
    })
}
// 6. B (Lab 6 8 Exchanging Ice Candidates) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addIceCandidate(socket, senderid, roomName, iceCandidate, callback){
    let user = io.sockets.adapter.rooms[roomName].participants[socket.id]
    if(user != null){
        let candidate = kurento.register.complexTypes.IceCandidate(iceCandidate)
        if(senderid === user.id) {
            if(user.outgoingMedia) {
                user.outgoingMedia.addIceCandidate(candidate)
            } else {
                iceCandidateQueues[user.id].push({candidate: candidate})///////
            }
        } else {
            if(user.incomingMedia[senderid]) { // if already exist
                user.incomingMedia[senderid].addIceCandidate(candidate)
            } else {
                if(!iceCandidateQueues[senderid]) {
                    iceCandidateQueues[senderid] = []
                }
                iceCandidateQueues[senderid].push({candidate: candidate})
            }
        }
        callback(null)
    } else {
        callback(new Error("addIceCandidate failed"))
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.static('public')) // 정적 파일 불러오기

http.listen(3000, () => {
    console.log('App is running')
})