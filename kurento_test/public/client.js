let divRoomSelection = document.getElementById('roomSelection')
let divMeetingRoom = document.getElementById('meetingRoom')
let inputRoom = document.getElementById('room')
let inputName = document.getElementById('name')
let btnRegister = document.getElementById('register')

// variables
let roomName
let userName
let participants = {}

let socket = io() // ?
// let socket = io.connect("http://127.0.0.1:3000"); // +
// 1. Signalling ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
btnRegister.onclick = () => {
    roomName = inputRoom.value
    userName = inputName.value

    if(roomName === '' || userName === ''){
        alert('Room and name are required')
    } else{
        let message = {
            event: 'joinRoom',
            userName: userName,
            roomName: roomName
        }
        sendMessage(message)
        console.log("send message...")
        divRoomSelection.style = "display: none"
        divMeetingRoom.style = "display: block"
    }
}

socket.on('message', message => {
    console.log('Message arrived', message.event)

    switch(message.event){
        case 'newParticipantArrived':
            console.log("client receive: newParticipantArrived...")
            receiveVideo(message.userid, message.username)
            break
        case 'existingParticipants':
            console.log("client receive: existingParticipants...")
            onExistingParticipants(message.senderid, message.sdpAnswer)
            break
        case 'receiveVideoAnswer':
            onReceiveVideoAnswer(message.senderid, message.sdpAnswer)
                break
        case 'candidate':
            console.log("client receive: candidate...")
            addIceCandidate(message.userid, message.candidate)
            break
        case 'XX':
            console.log("client receive: XX...")
            break
    }
})

function sendMessage(message) {
    socket.emit('message', message)
}
// 4. A, C Sending and Receiving Streams ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function receiveVideo(userid, username) {
    let video = document.createElement('video')
    let div = document.createElement('div')
    div.className = 'videoContainer'
    let name = document.createElement('div')
    video.id = userid
    video.autoplay = true
    name.appendChild(document.createTextNode(username))
    div.appendChild(video)
    div.appendChild(name)
    divMeetingRoom.appendChild(div)

    let user = {
        id: userid,
        username: username,
        video: video,
        rtcPeer: null
    }

    participants[user.id] = user

    let options = {
        remoteVideo: video,
        onicecandidate: onIceCandidate
    }
    //////////////////
    user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
        if (error) {
            return console.log(err)
        }
        this.generateOffer(onOffer) ///
    })

    let onOffer = (err, offer, wp) => {
        let message = {
            event: 'receiveVideoFrom',
            userid: user.id,
            roomName: roomName,
            sdpOffer: offer
        }
        sendMessage(message)
    }

    function onIceCandidate(candidate, wp){
        let message = {
            event: 'candidate',
            userid: user.id,
            roomName: roomName,
            candidate: candidate
        }
        sendMessage(message)
    }

}
// 4. A, C Sending and Receiving Streams //
function onExistingParticipants(userid, existingUsers) {
    let video = document.createElement('video')
    let div = document.createElement('div')
    div.className = 'videoContainer'
    let name = document.createElement('div')
    video.id = userid
    video.autoplay = true
    name.appendChild(document.createTextNode(userName))
    div.appendChild(video)
    div.appendChild(name)
    divMeetingRoom.appendChild(div)

    let user = {
        id: userid,
        username: userName,
        video: video,
        rtcPeer: null
    }

    participants[user.id] = user

    let constraints = {
        audio: true,
        video: {
            mandatory: {
                maxWidth: 320,
                maxFrameRate: 15,
                minFrameRate: 15
            }
        }
    }

    let options = {
        localVideo: video,
        onicecandidate: onIceCandidate,
        mediaConstraints: constraints
    }
    //////////////////
    user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
        if (error) {
            return console.log(err)
        }
        this.generateOffer(onOffer)
    })

    existingUsers.forEach(element => {
        receiveVideo(element.id, element.name)
    })

    let onOffer = (err, offer, wp) => {
        let message = {
            event: 'receiveVideoFrom',
            userid: user.id,
            roomName: roomName,
            sdpOffer: offer
        }
        sendMessage(message)
    }

    function onIceCandidate(candidate, wp){
        let message = {
            event: 'candidate',
            userid: user.id,
            roomName: roomName,
            candidate: candidate
        }
        sendMessage(message)
    }
}
// 5. Connecting Endpoints (Lab 6 7) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function onReceiveVideoAnswer(senderid, sdpAnswer){
    participants[senderid].rtcPeer.processAnswer(sdpAnswer)
}
// 6. B (Lab 6 8 Exchanging Ice Candidates) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addIceCandidate(userid, candidate) {
    participants[userid].rtcPeer.addIceCandidate(candidate)
    // WebRTC 피어 연결에 ICE 후보를 추가하는 JavaScript 기능
    // rtcPeer 속성은 피어 연결에 액세스하는데 사용되며
    // , addIceCandidate 메서드는 연결에 후보를 추가하기 위해 호출된다.
    // (WebRTC API)
}
