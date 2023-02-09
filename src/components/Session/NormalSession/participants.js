

// function Participant(name) {
//   this.name = name;
//   this.rtcPeer = null;
//   // 호스트 여부
//   this.isHost = (name==="admin") ? true : false;
//   // 권한 목록
//   this.authorization = { 
//     isCompilePossible: this.isHost, 
//     isMicPossible: true,
//     isDrawPossible: true
//   }
//   this.isDrawButtonOn = isDrawButtonOn;
//   this.onToggleAuthorization = function(authorizationType) {
//     switch (authorizationType) {
//       case "compile":
//         this.authorization.isCompilePossible = !this.authorization.isCompilePossible;
//         break;
//       case "mic":
//         this.authorization.isMicPossible = !this.authorization.isMicPossible;
//         // console.log(this.rtcPeer);
//         // console.log(this.rtcPeer.peerConnection)
//         console.log("toggle button")
//         // this.rtcPeer.generateOffer (this.offerToReceiveVideo.bind(this))
//         break;
//       case "draw":
//         this.authorization.isDrawPossible = !this.authorization.isDrawPossible;
//         break;
//       default:
//         break;
//     }
//     participants[this.name] = this;
//     participantsInstances.set(1, participants);
//   }

//   var container = document.createElement('div');
//   container.className = isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
//   container.id = name;
//   var span = document.createElement('span');
//   var video = document.createElement('video');

//   container.appendChild(video);
//   container.appendChild(span);
//   container.onclick = switchContainerClass;
//   // document.getElementById('participants').appendChild(container);

//   // span.appendChild(document.createTextNode(name));

//   video.id = 'video-' + name;
//   video.autoplay = true;
//   video.controls = false;


//   this.getElement = function() {
//     return container;
//   }

//   this.getVideoElement = function() {
//     return video;
//   }

//   function switchContainerClass() {
//     if (container.className === PARTICIPANT_CLASS) {
//       var elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
//       elements.forEach(function(item) {
//           item.className = PARTICIPANT_CLASS;
//         });

//         container.className = PARTICIPANT_MAIN_CLASS;
//       } else {
//       container.className = PARTICIPANT_CLASS;
//     }
//   }

//   function isPresentMainParticipant() {
//     return ((document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)).length != 0);
//   }

//   this.offerToReceiveVideo = function(error, offerSdp, wp){
//     if (error) return console.error ("sdp offer error")
//     console.log('Invoking SDP offer callback function');
//     var msg =  { id : "receiveVideoFrom",
//         sender : name,
//         sdpOffer : offerSdp
//       };
//     sendMessage(msg);
//   }


//   this.onIceCandidate = function (candidate, wp) {
//       console.log("Local candidate" + JSON.stringify(candidate));

//       var message = {
//         id: 'onIceCandidate',
//         candidate: candidate,
//         name: name
//       };
//       sendMessage(message);
//   }

//   Object.defineProperty(this, 'rtcPeer', { writable: true});

//   this.dispose = function() {
//     console.log('Disposing participant ' + this.name);
//     this.rtcPeer.dispose();
//     container.parentNode.removeChild(container);
//   };
// }