import { createSlice } from "@reduxjs/toolkit";

// let ws = new WebSocket('wss://' + window.location.host + '/groupcall');
// let participants = {};
// let name;
const kurentoUtils = require("kurento-utils");

// window.onbeforeunload = function() {
// 	ws.close();
// };

// ws.onmessage = function(message) {
// 	let parsedMessage = JSON.parse(message.data);
// 	console.info('Received message: ' + message.data);

// 	switch (parsedMessage.id) {
// 	case 'existingParticipants':
// 		onExistingParticipants(parsedMessage);
// 		// countUsers();
// 		break;
// 	case 'newParticipantArrived':
// 		onNewParticipant(parsedMessage);
// 		// countUsers();
// 		break;
// 	case 'participantLeft':
// 		onParticipantLeft(parsedMessage);
// 	    // countUsers();
// 	    notifyLeaving(parsedMessage.name);
// 		break;
// 	case 'receiveVideoAnswer':
// 		receiveVideoResponse(parsedMessage);
// 		break;
// 	case 'iceCandidate':
// 		participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
// 	        if (error) {
// 		      console.error("Error adding candidate: " + error);
// 		      return;
// 	        }
// 	    });
// 	    break;
// 	case 'noticeChat':
// 	    noticeChat(parsedMessage.userName, parsedMessage.chat);
// 	    break;
//     case 'turnVideoOff':
//         turnVideoOffFromHost();
//         break;
//     case 'leaveByHost':
//         leaveRoom();
//         break;
//     case 'startReading':
//         // startReadingTimer();
//         break;
// 	default:
// 		console.error('Unrecognized message', parsedMessage);
// 	}
// }



// // btnHostLeave.onclick = () => {
// //     console.log("buttonHoseLeave click...")
// //     let roomName = document.getElementById('roomName').value;
// //     var message = {
// //         id : 'hostLeft',
// //         roomName : roomName,
// //     }
// //     sendMessage(message);
// // }

// function notifyLeaving(user) {
//     let li = document.createElement('li')
//     let text = document.createTextNode(`${user}님이 나갔습니다.`)
//     li.appendChild(text)
//     // ulChat.appendChild(li)
// }

// function noticeChat(user, chat) {
//     let ul = document.querySelector("#chatList");
//     let li = document.createElement("li");
//     let text = document.createTextNode(`${user}: ${chat}`)
//     // let text = document.createTextNode(`${chat}`);
//     li.appendChild(text);
//     ul.appendChild(li);
//     console.log(chat)
// }

// // btnVideoOnOff.onclick = onOffVideo;

// function onOffVideo() {
//     console.log("participants: ", participants); //
//     let name = document.getElementById('name').value;
// //    console.log("video enabled:", participants[name].rtcPeer.videoEnabled);
// //    console.log("audio enabled:", participants[name].rtcPeer.audioEnabled);
//     participants[name].rtcPeer.videoEnabled = !participants[name].rtcPeer.videoEnabled;

// //    var audioTracks = participants[name].rtcPeer.pc.getLocalStreams()[0].getAudioTracks();
// //    // Uncaught TypeError: Cannot read properties of undefined (reading 'getLocalStreams')
// //    // if MediaStream has reference to microphone
// //    if (audioTracks[0]) {
// //        audioTracks[0].enabled = false;
// //    }
// }

// // btnOtherVideosOff.onclick = clickOtherVideosOff;

// function clickOtherVideosOff() {
//     var roomName = document.getElementById('roomName').value;
//     var userName = document.getElementById('name').value;
//     var message = {
//         id : 'controlOtherVideos',
//         roomName : roomName,
//         userName: userName
//     }
//     sendMessage(message);
// }

// function turnVideoOffFromHost() {
//     let name = document.getElementById('name').value;
//     participants[name].rtcPeer.videoEnabled = false;
// //    console.log("audio enabled:", participants[name].rtcPeer.audioEnabled);
// }

// //function onAllVideo() {
// //    for(key in participants){
// //         console.log(key);
// //         console.log(participants[key]);
// ////         participants[key].rtcPeer.videoEnabled = true;
// //         // participants[key].rtcPeer.audioEnabled
// //    }
// //}

// function countUsers() {
//     let count = Object.keys(participants).length;// + number;
//     document.getElementById('numberOfUsers').innerText = '인원수: ' + count;
// //    return Object.keys(participants).length;
// }

// // function register() {
// // 	var message = {
// // 		id : 'joinRoom',
// // 		name : name,
// // 		room : room,
// // 	}
// // 	sendMessage(message);
// // }

// function onNewParticipant(request) {
//     let li = document.createElement('li')
//     let text = document.createTextNode(`${request.name}님이 들어왔습니다.`)
//     li.appendChild(text)
//     // ulChat.appendChild(li)

// 	receiveVideo(request.name);
// }

// function receiveVideoResponse(result) {
// 	participants[result.name].rtcPeer.processAnswer (result.sdpAnswer, function (error) {
// 		if (error) return console.error (error);
// 	});
// }

// function callResponse(message) {
// 	// if (message.response != 'accepted') {
// 	// 	console.info('Call not accepted by peer. Closing call');
// 	// 	stop();
// 	// } else {
// 	// 	webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
// 	// 		if (error) return console.error (error);
// 	// 	});
// 	// }
// }

// function onExistingParticipants(msg) {
// 	var constraints = {
// 		audio : true,
// 		video : {
// 			mandatory : {
// 				maxWidth : 320,
// 				maxFrameRate : 15,
// 				minFrameRate : 15
// 			}
// 		}
// 	};
// 	// console.log(name + " registered in room " + room);
// 	// var participant = new Participant(name);
// 	// participants[name] = participant;
// 	// var video = participant.getVideoElement();

// 	// var options = {
// 	//       localVideo: video,
// 	//       mediaConstraints: constraints,
// 	//       onicecandidate: participant.onIceCandidate.bind(participant)
// 	//     }
// 	// participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
// 	// 	function (error) {
// 	// 	  if(error) {
// 	// 		  return console.error(error);
// 	// 	  }
// 	// 	  this.generateOffer (participant.offerToReceiveVideo.bind(participant));
// 	// });

// //    console.log("getLocalStream...", participants[name].rtcPeer.getLocalStream()); //
// //	console.log("getLocalStream...", participant.rtcPeer.getLocalStream()); //

// 	msg.data.forEach(receiveVideo);
// }

// function leaveRoom() {
// 	sendMessage({
// 		id : 'leaveRoom'
// 	});

// 	for ( var key in participants) {
// 		participants[key].dispose();
// 	}

//     // TODO: 세션 방 목록 페이지로 이동하기
// 	document.getElementById('join').style.display = 'block';
// 	document.getElementById('room').style.display = 'none';

// 	ws.close();

// 	// host면 btnHostLeave.onclick = () => { ...
// }

// function receiveVideo(sender) {
// 	// var participant = new Participant(sender);
// 	// participants[sender] = participant;
// 	// var video = participant.getVideoElement();

// 	// var options = {
//   //     remoteVideo: video,
//   //     onicecandidate: participant.onIceCandidate.bind(participant)
//   //   }

// 	// participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
// 	// 		function (error) {
// 	// 		  if(error) {
// 	// 			  return console.error(error);
// 	// 		  }
// 	// 		  this.generateOffer (participant.offerToReceiveVideo.bind(participant));
// 	// });;
// }

// function onParticipantLeft(request) {
// 	console.log('Participant ' + request.name + ' left');
// 	var participant = participants[request.name];
// 	participant.dispose();
// 	delete participants[request.name];
// }

// function sendMessage(message) {
// 	var jsonMessage = JSON.stringify(message);
// 	console.log('Sending message: ' + jsonMessage);
// 	ws.send(jsonMessage);
// }


const initialState = {

};



const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    createWebsocket(state, action) {
      // // ws = new WebSocket('wss://' + window.location.host + '/groupcall');
      // console.log(ws)
      // ws.addEventListener("open", () => {
      //   console.log(ws);
      //   const message = {
      //     id: "joinRoom",
      //     name: "testUserName",
      //     room: "testRoomName",
      //   }
  
      //   ws.send(JSON.stringify(message));
      // })
    },
    sendChat(state, action) {
      // let roomName = "testRoomName";
      // let userName = "testUserName";
      // let chat = action.payload;

      // const message = {
      //   id : 'sendChat',
      //   userName : userName,
      //   roomName : roomName,
      //   chat : chat
      // }
      // sendMessage(message);
      // noticeChat("[me]", chat);
    },
    receiveChat(state, action) {
      // if (ws) {
      //   ws.onmessage = function(message) {
      //     let parsedMessage = JSON.parse(message.data);
      //     switch (parsedMessage.id) {
      //       case "sendChat":
      //         let newMessage = parsedMessage.chat
      //         return newMessage
      //       default:
      //         return null
      //     }
      //   }
      // }
    }
  }
});

export const { createWebsocket, sendChat, receiveChat } = sessionSlice.actions;

export default sessionSlice;