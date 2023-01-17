let divRoomSelection = document.getElementById('roomSelection')
let divMeetingRoom = document.getElementById('meetingRoom')
let inputRoom = document.getElementById('room')
let inputName = document.getElementById('name')
let btnRegister = document.getElementById('register')

let divTextChatting = document.getElementById('textChatting')
let inputTextChat = document.getElementById('textChat')
let btnSendTextChat = document.getElementById('SendtextChat')
let ulTextChat = document.getElementById('TextChatMssages')


// variables
let roomName
let userName
let participants = {}

let socket = io()
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

        // let message = {
        //     event: 'req_join_room',
        //     userName: userName,
        //     roomName: roomName
        // }
        // socket.emit('req_join_room', message)

        divTextChatting.style = "display: "

    }
}

btnSendTextChat.onclick = () => {
    roomName = inputRoom.value
    userName = inputName.value
    let textChat = inputTextChat.value

    let message = {
        // event: '',
        roomName: roomName,
        userName: userName,
        textChat: textChat
    }
    socket.emit('text_chat', message)

}
socket.on('noti_text_chat', (msg) => {
    let li = document.createElement('li')
    let text = document.createTextNode(`[${msg.userName}]: ${msg.textChat}`)
    li.appendChild(text)
    ulTextChat.appendChild(li)
})
socket.on('noti_join_room', (username) => {
    console.log("recevi video...")
    let li = document.createElement('li')
    let text = document.createTextNode(`[${username}]님이 방에 입장하였습니다.`)
    li.appendChild(text)
    ulTextChat.appendChild(li)
})
socket.on('message', message => {
    console.log('Message arrived', message.event)

    switch(message.event){
        case 'newParticipantArrived':
            receiveVideo(message.userid, message.username)
            break
        case 'existingParticipants':
            console.log("client receive: existingParticipants...")
            onExistingParticipants(message.senderid, message.sdpAnswer)
            break
        // case 'receiveVideoAnswer':
        //     onReceiveVideoAnswer(message.senderid, message.sdpAnswer)
        //         break
        // case 'candidate':
        //     console.log("client receive: candidate...")
        //     addIceCandidate(message.userid, message.candidate)
        //     break
    }
})

function sendMessage(message) {
    socket.emit('message', message)
}
// 4. A, C Sending and Receiving Streams ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function receiveVideo(userid, username) {
    // let video = document.createElement('video')
    // let div = document.createElement('div')
    // div.className = 'videoContainer'
    // let name = document.createElement('div')
    // video.id = userid
    // video.autoplay = true
    // name.appendChild(document.createTextNode(username))
    // div.appendChild(video)
    // div.appendChild(name)
    // divMeetingRoom.appendChild(div)
    ///
    console.log("recevi video...")
    let li = document.createElement('li')
    let text = document.createTextNode(userName)
    li.appendChild(text)
    ulTextChat.appendChild(li)
    ///
    let user = {
        id: userid,
        username: username,
        // video: video,
        // rtcPeer: null
    }

    participants[user.id] = user

    // let options = {
    //     remoteVideo: video,
    //     onicecandidate: onIceCandidate
    // }
    // //////////////////
    // user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
    //     if (error) {
    //         return console.log(err)
    //     }
    //     this.generateOffer(onOffer) ///
    // })

    // let onOffer = (err, offer, wp) => {
    //     let message = {
    //         event: 'receiveVideoFrom',
    //         userid: user.id,
    //         roomName: roomName,
    //         sdpOffer: offer
    //     }
    //     sendMessage(message)
    // }

    // function onIceCandidate(candidate, wp){
    //     let message = {
    //         event: 'candidate',
    //         userid: user.id,
    //         roomName: roomName,
    //         candidate: candidate
    //     }
    //     sendMessage(message)
    // }

}
// 4. A, C Sending and Receiving Streams //
function onExistingParticipants(userid, existingUsers) {
    // let video = document.createElement('video')
    // let div = document.createElement('div')
    // div.className = 'videoContainer'
    // let name = document.createElement('div')
    // video.id = userid
    // video.autoplay = true
    // name.appendChild(document.createTextNode(userName))
    // div.appendChild(video)
    // div.appendChild(name)
    // divMeetingRoom.appendChild(div)
    ///
    let li = document.createElement('li')
    let text = document.createTextNode(userName)
    li.appendChild(text)
    ulTextChat.appendChild(li)
    ///
    let user = {
        id: userid,
        username: userName,
        // video: video,
        // rtcPeer: null
    }

    participants[user.id] = user

    // let constraints = {
    //     audio: true,
    //     video: {
    //         mandatory: {
    //             maxWidth: 320,
    //             maxFrameRate: 15,
    //             minFrameRate: 15
    //         }
    //     }
    // }
    
    existingUsers.forEach(element => {
        receiveVideo(element.id, element.name)
    })

    // let options = {
    //     localVideo: video,
    //     onicecandidate: onIceCandidate,
    //     mediaConstraints: constraints
    // }
    // //////////////////
    // user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
    //     if (error) {
    //         return console.log(err)
    //     }
    //     this.generateOffer(onOffer)
    // })

    // existingUsers.forEach(element => {
    //     receiveVideo(element.id, element.name)
    // })

    // let onOffer = (err, offer, wp) => {
    //     let message = {
    //         event: 'receiveVideoFrom',
    //         userid: user.id,
    //         roomName: roomName,
    //         sdpOffer: offer
    //     }
    //     sendMessage(message)
    // }

    // function onIceCandidate(candidate, wp){
    //     let message = {
    //         event: 'candidate',
    //         userid: user.id,
    //         roomName: roomName,
    //         candidate: candidate
    //     }
    //     sendMessage(message)
    // }
}
// 5. Connecting Endpoints (Lab 6 7) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function onReceiveVideoAnswer(senderid, sdpAnswer){
//     participants[senderid].rtcPeer.processAnswer(sdpAnswer)
// }
// // 6. B (Lab 6 8 Exchanging Ice Candidates) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function addIceCandidate(userid, candidate) {
//     participants[userid].rtcPeer.addIceCandidate(candidate)
// }
