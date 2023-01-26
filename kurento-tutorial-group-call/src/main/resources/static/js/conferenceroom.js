/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var ws = new WebSocket('wss://' + location.host + '/groupcall');
var participants = {};
var name;
let btnSendChat = document.getElementById('btnSendChat'); //
let btnVideoOnOff = document.getElementById('btnVideoOnOff'); //
//let btnAllVideoOn = document.getElementById('btnAllVideoOn'); //
let btnOtherVideosOff = document.getElementById('btnOtherVideosOff'); //

window.onbeforeunload = function() {
	ws.close();
};

ws.onmessage = function(message) {
	var parsedMessage = JSON.parse(message.data);
	console.info('Received message: ' + message.data);

	switch (parsedMessage.id) {
	case 'existingParticipants':
		onExistingParticipants(parsedMessage);
		break;
	case 'newParticipantArrived':
		onNewParticipant(parsedMessage);
		break;
	case 'participantLeft':
	    notifyLeaving(parsedMessage.name);
		onParticipantLeft(parsedMessage);
		break;
	case 'receiveVideoAnswer':
		receiveVideoResponse(parsedMessage);
		break;
	case 'iceCandidate':
		participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
	        if (error) {
		      console.error("Error adding candidate: " + error);
		      return;
	        }
	    });
	    break;
	case 'noticeChat':
	    noticeChat(parsedMessage.userName, parsedMessage.chat);
	    break;
//	case 'noticeLeaving':
//	    notifyLeaving(parsedMessage.userName);
    case 'turnVideoOff':
        turnVideoOffFromHost();
        break;
	default:
		console.error('Unrecognized message', parsedMessage);
	}
}

btnSendChat.onclick = () => {
    console.log("button click...")
    let roomName = document.getElementById('roomName').value;
    let userName = document.getElementById('name').value;
    let chat = document.getElementById('inputChat').value;

    var message = {
        id : 'sendChat',
        userName : userName,
        roomName : roomName,
        chat : chat
    }
    sendMessage(message);

    noticeChat("[me]", chat);
}

function notifyLeaving(user) {
    let li = document.createElement('li')
    let text = document.createTextNode(`${user}님이 나갔습니다.`)
    li.appendChild(text)
    ulChat.appendChild(li)
}

function noticeChat(user, chat) {
    let li = document.createElement('li')
    let text = document.createTextNode(`${user}: ${chat}`)
    li.appendChild(text)
    ulChat.appendChild(li)
}

btnVideoOnOff.onclick = onOffVideo;

function onOffVideo() {
    let name = document.getElementById('name').value;
//    console.log("video enabled:", participants[name].rtcPeer.videoEnabled);
//    console.log("audio enabled:", participants[name].rtcPeer.audioEnabled);
    participants[name].rtcPeer.videoEnabled = !participants[name].rtcPeer.videoEnabled;

//    var audioTracks = participants[name].rtcPeer.pc.getLocalStreams()[0].getAudioTracks();
//    // Uncaught TypeError: Cannot read properties of undefined (reading 'getLocalStreams')
//    // if MediaStream has reference to microphone
//    if (audioTracks[0]) {
//        audioTracks[0].enabled = false;
//    }
}

btnOtherVideosOff.onclick = clickOtherVideosOff;
function clickOtherVideosOff() {
    var roomName = document.getElementById('roomName').value;
    var userName = document.getElementById('name').value;
    var message = {
        id : 'controlOtherVideos',
        roomName : roomName,
        userName: userName
    }
    sendMessage(message);
}

function turnVideoOffFromHost() {
    let name = document.getElementById('name').value;
    participants[name].rtcPeer.videoEnabled = false;
//    console.log("audio enabled:", participants[name].rtcPeer.audioEnabled);
}

//function onAllVideo() {
//    for(key in participants){
//         console.log(key);
//         console.log(participants[key]);
////         participants[key].rtcPeer.videoEnabled = true;
//         // participants[key].rtcPeer.audioEnabled
//    }
//}

function register() {
	name = document.getElementById('name').value;
	var room = document.getElementById('roomName').value;

	document.getElementById('room-header').innerText = 'ROOM ' + room;
	document.getElementById('join').style.display = 'none';
	document.getElementById('room').style.display = 'block';

	var message = {
		id : 'joinRoom',
		name : name,
		room : room,
	}
	sendMessage(message);
}

function onNewParticipant(request) {
    let li = document.createElement('li')
    let text = document.createTextNode(`${request.name}님이 들어왔습니다.`)
    li.appendChild(text)
    ulChat.appendChild(li)

	receiveVideo(request.name);
}

function receiveVideoResponse(result) {
	participants[result.name].rtcPeer.processAnswer (result.sdpAnswer, function (error) {
		if (error) return console.error (error);
	});
}

function callResponse(message) {
	if (message.response != 'accepted') {
		console.info('Call not accepted by peer. Closing call');
		stop();
	} else {
		webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
			if (error) return console.error (error);
		});
	}
}

function onExistingParticipants(msg) {
	var constraints = {
		audio : true,
		video : {
			mandatory : {
				maxWidth : 320,
				maxFrameRate : 15,
				minFrameRate : 15
			}
		}
	};
	console.log(name + " registered in room " + room);
	var participant = new Participant(name);
	participants[name] = participant;
	var video = participant.getVideoElement();

	var options = {
	      localVideo: video,
	      mediaConstraints: constraints,
	      onicecandidate: participant.onIceCandidate.bind(participant)
	    }
	participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
		function (error) {
		  if(error) {
			  return console.error(error);
		  }
		  this.generateOffer (participant.offerToReceiveVideo.bind(participant));
	});

//    console.log("getLocalStream...", participants[name].rtcPeer.getLocalStream()); //
//	console.log("getLocalStream...", participant.rtcPeer.getLocalStream()); //

	msg.data.forEach(receiveVideo);
}

function leaveRoom() {
	sendMessage({
		id : 'leaveRoom'
	});

	for ( var key in participants) {
		participants[key].dispose();
	}

	document.getElementById('join').style.display = 'block';
	document.getElementById('room').style.display = 'none';

	ws.close();
}

function receiveVideo(sender) {
	var participant = new Participant(sender);
	participants[sender] = participant;
	var video = participant.getVideoElement();

	var options = {
      remoteVideo: video,
      onicecandidate: participant.onIceCandidate.bind(participant)
    }

	participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
			function (error) {
			  if(error) {
				  return console.error(error);
			  }
			  this.generateOffer (participant.offerToReceiveVideo.bind(participant));
	});;
}

function onParticipantLeft(request) {
	console.log('Participant ' + request.name + ' left');
	var participant = participants[request.name];
	participant.dispose();
	delete participants[request.name];
}

function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	console.log('Sending message: ' + jsonMessage);
	ws.send(jsonMessage);
}
