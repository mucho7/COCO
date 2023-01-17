const express = require('express')
const app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)

io.on('connection', (socket) => {
    socket.on('message', message => {
        switch(message.event){
            case 'joinRoom':
                joinRoom(socket, message.userName, message.roomName)
                console.log("joinRoom the end...")
                break
        }
    });
    socket.on('req_join_room', async (msg) => {
        let roomName = msg.roomName;
        let userName = msg.userName;
        // socket.join(roomName)
        // io.to(roomName).emit('noti_join_room', "방에 입장하였습니다.");
        
        joinRoom(socket, userName, roomName);
    })
    socket.on('text_chat', (msg) => {
        io.to(msg.roomName).emit('noti_text_chat', msg);
    });
    socket.on('disconnect', () => {
        console.log("client disconnect"); // 새로고침도 'disconnect'
   })
})

// 3. Creating Outgoing WebRTC Endpoint ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function joinRoom(socket, username, roomname) {
    socket.join(roomname)
    socket.to(roomname).emit('noti_join_room', username);
    // console.log("join Room: ", username, roomname)//

    let clientsInRoom = io.sockets.adapter.rooms.get(roomname).size
    if (io.sockets.adapter.rooms.has(roomname)) {
        console.log(io.sockets.adapter.rooms.get(roomname))
        console.log("clientsInRoom(number): ", clientsInRoom)
    }
    // console.log(io.sockets.adapter.rooms)
    // console.log(io.sockets.adapter.rooms.get(roomname))
    // io.sockets.adapter.rooms.set(roomname, username)
    // console.log(socket.id)
    /*let roomMapName = '@' + roomname
    let roomMap = io.sockets.adapter.rooms
    if (roomMap.has(roomname)) {
        let roomSet = roomMap.get(roomMapName)
        console.log(roomMap.get(roomMapName))
        // roomSet.add(username)
    } else {
        let roomSet = new Set([username])
        roomMap.set(roomMapName, roomSet)
    }
    console.log(io.sockets.adapter.rooms)*/
    // console.log(io.sockets.adapter.rooms)
    /* Map, Set
    Map(3) {
    'rbL-6F6Hv3lNo2YFAAAF' => Set(1) { 'rbL-6F6Hv3lNo2YFAAAF' },
    '1' => Set(2) { 'rbL-6F6Hv3lNo2YFAAAF', 'V8zCtJPqL-GCg_sTAAAH' },
    'V8zCtJPqL-GCg_sTAAAH' => Set(1) { 'V8zCtJPqL-GCg_sTAAAH' }
    }
    Map: set(key, value), get, has, delete
    Set: add, has, delete
    */
    // let myRoom = io.sockets.adapter.rooms[roomname] || {length: 0} // X
    // let numClients = myRoom.length // X
    // console.log("numClients", numClients) // X

    // if(numClients == 0){
    //     myRoom = io.sockets.adapter.rooms[roomname]
    //     myRoom.participants = {}
    //     // 
    // }
    // else {
    //     //
    // }

    // let user = {
    //     id: socket.id,
    //     name: username,
    // }
    // socket.to(roomname).emit('message', {
    //     event: 'newParticipantArrived',
    //     userid: user.id,
    //     username: user.name
    // })
    // let existingUsers = []
    // for (let i in myRoom.participants) {
    //     if (myRoom.participants[i].id != user.id) {
    //         existingUsers.push({
    //             id: myRoom.participants[i].id,
    //             name: myRoom.participants[i].name
    //         })
    //     }
    // }

    // socket.emit('message', {
    //     event: 'existingParticipants',
    //     existingUsers: existingUsers,
    //     userid: user.id
    // })

    // myRoom.participants[user.id] = user







    // console.log("---get Room---")
    // // console.log(roomname)
    // if (numClients == 0) {
    //     console.log("==0==")
    //     socket.join(roomname, (error) => {
    //         if(error){
    //             console.log(error)
    //         } else {
    //             myRoom = io.sockets.adapter.rooms[roomname]
    //             myRoom.participants = {}
    //             // callback(null, myRoom)
    //             console.log("!!!!myRoom.participants: ", myRoom.participants)
    //         }
    //     })
    //     console.log("function getRoom...if numClients == 0 ...end")
    // }
    // else {
    //     console.log("==!0!==")
    //     socket.join(roomname)
    //     // callback(null, myRoom)
    // }

    
    // -----------------------------------------------
    // getRoom(socket, roomname, (err, myRoom) => { // roomName (X), roomname (O)!!
    //     console.log("..................")
    //     if (err) {
    //         console.log("getRoom Err.......")
    //         return callback(err)
    //     }
    //     // 여기서는 socket.emit안된다.
    //     console.log("xx", socket.connected)//
    //     // XX
    //     console.log("get room...")

    //     // creates user
    //     let user = {
    //         id: socket.id,
    //         name: username,
    //         outgoingMedia: outgoingMedia,
    //         incomingMedia: {}
    //     }

    //     socket.to(roomname).emit('message', {
    //         event: 'newParticipantArrived',
    //         userid: user.id,
    //         username: user.name
    //     })

    //     let existingUsers = []
    //     for (let i in myRoom.participants) {
    //         if (myRoom.participants[i].id != user.id) {
    //             existingUsers.push({
    //                 id: myRoom.participants[i].id,
    //                 name: myRoom.participants[i].name
    //             })
    //         }
    //     }

    //     socket.emit('message', {
    //         event: 'existingParticipants',
    //         existingUsers: existingUsers,
    //         userid: user.id
    //     })

    //     myRoom.participants[user.id] = user
    // })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.static('public')) // 정적 파일 불러오기

http.listen(3000, () => {
    console.log('App is running')
})