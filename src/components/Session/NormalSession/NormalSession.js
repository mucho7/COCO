import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { receiveChat } from "../../../store/sessionSlice";

import IdeArea from "../IdeArea";
import SideArea from "../SideArea";
import ToolBar from "../ToolBar";

let kurentoUtils = require("kurento-utils");
const adapter = require("webrtc-adapter");


const NormalSessionDiv = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-template-rows: 11fr 1fr;
  width: 100vw;
  height: 100vh;
`;


function NormalSession(props) {
  let ws = useRef(null);
  const dispatch = useDispatch();
  let sendingMessage = useSelector((state) => state.session.sendMessage);
  let userName = useSelector((state) => state.session.userName);
  let roomName = useSelector((state) => state.session.roomName);

  console.log("xx", userName, roomName);
  // console.log(sendingMessage)
  
  function sendMessage(message) {
    let jsonMessage = JSON.stringify(message);
    console.log('Sending message: ' + jsonMessage);
    ws.current.send(jsonMessage);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.resizeTo(1600, 900)
    });

    if (!ws.current) {
      ws.current = new WebSocket("wss://localhost:8443/groupcall")
      console.log(ws.current);
      ws.current.onopen = () => {
        console.log(ws.current);
        register();
        const msg = {
          id: "sendChat",
          userName: userName,
          roomName: roomName,
          chat: "test message"
        }
        sendMessage(msg);
      }
      let participants = {};
      let name;
  
      ws.current.onmessage = function(message) {
        let parsedMessage = JSON.parse(message.data);
        console.info("received message: " + message.data);
  
        switch (parsedMessage.id) {
          case 'existingParticipants':
            onExistingParticipants(parsedMessage);
            break;
          case 'newParticipantArrived':
            onNewParticipant(parsedMessage);
            break;
          case 'participantLeft':
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
          case "noticeChat":
            noticeChat(parsedMessage.userName, parsedMessage.chat);
            break;
          default:
            console.error('Unrecognized message', parsedMessage);
        }
      }

      function register() {
        let message = {
          id : 'joinRoom',
          name : userName,
          room : roomName,
        }
        sendMessage(message);
      }

      function onNewParticipant(request) {
        receiveVideo(request.name);
      }

      function receiveVideoResponse(result) {
        participants[result.name].rtcPeer.processAnswer (result.sdpAnswer, function (error) {
          if (error) return console.error (error);
        });
      }

      function callResponse(message) {
        if (message.response !== 'accepted') {
          console.info('Call not accepted by peer. Closing call');
          // stop();
        } else {
          kurentoUtils.WebRtcPeer.processAnswer(message.sdpAnswer, function (error) {
            if (error) return console.error (error);
          });
        }
      }

      function onExistingParticipants(msg) {
        // var constraints = {
        //   audio : true,
        //   video : {
        //     mandatory : {
        //       maxWidth : 320,
        //       maxFrameRate : 15,
        //       minFrameRate : 15
        //     }
        //   }
        // };
        console.log(userName + " registered in room " + roomName);
        // var participant = new Participant(name);
        // participants[name] = participant;
        // var video = participant.getVideoElement();
      
        // var options = {
        //       localVideo: video,
        //       mediaConstraints: constraints,
        //       onicecandidate: participant.onIceCandidate.bind(participant)
        //     }
        // participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
        //   function (error) {
        //     if(error) {
        //       return console.error(error);
        //     }
        //     this.generateOffer (participant.offerToReceiveVideo.bind(participant));
        // });
      
        // msg.data.forEach(receiveVideo);
      }

      function leaveRoom() {
        sendMessage({
          id : 'leaveRoom'
        });
      
        for ( var key in participants) {
          participants[key].dispose();
        }
      
        // document.getElementById('join').style.display = 'block';
        // document.getElementById('room').style.display = 'none';
      
        ws.current.close();
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

      function noticeChat(user, chat) {
        dispatch(receiveChat({user, chat}));
      }
  
      

      const PARTICIPANT_MAIN_CLASS = 'participant main';
      const PARTICIPANT_CLASS = 'participant';

      /**
       * Creates a video element for a new participant
       *
       * @param {String} name - the name of the new participant, to be used as tag
       *                        name of the video element.
       *                        The tag of the new element will be 'video<name>'
       * @return
       */
      function Participant(name) {
        this.name = name;
        var container = document.createElement('div');
        container.className = isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
        container.id = name;
        var span = document.createElement('span');
        var video = document.createElement('video');
        var rtcPeer;

        container.appendChild(video);
        container.appendChild(span);
        container.onclick = switchContainerClass;
        // document.getElementById('participants').appendChild(container);

        // span.appendChild(document.createTextNode(name));

        video.id = 'video-' + name;
        video.autoplay = true;
        video.controls = false;


        // this.getElement = function() {
        //   return container;
        // }

        // this.getVideoElement = function() {
        //   return video;
        // }

        function switchContainerClass() {
          if (container.className === PARTICIPANT_CLASS) {
            var elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
            elements.forEach(function(item) {
                item.className = PARTICIPANT_CLASS;
              });

              container.className = PARTICIPANT_MAIN_CLASS;
            } else {
            container.className = PARTICIPANT_CLASS;
          }
        }

        function isPresentMainParticipant() {
          return ((document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)).length != 0);
        }

        this.offerToReceiveVideo = function(error, offerSdp, wp){
          if (error) return console.error ("sdp offer error")
          console.log('Invoking SDP offer callback function');
          var msg =  { id : "receiveVideoFrom",
              sender : name,
              sdpOffer : offerSdp
            };
          sendMessage(msg);
        }


        this.onIceCandidate = function (candidate, wp) {
            console.log("Local candidate" + JSON.stringify(candidate));

            var message = {
              id: 'onIceCandidate',
              candidate: candidate,
              name: name
            };
            sendMessage(message);
        }

        Object.defineProperty(this, 'rtcPeer', { writable: true});

        this.dispose = function() {
          console.log('Disposing participant ' + this.name);
          this.rtcPeer.dispose();
          container.parentNode.removeChild(container);
        };
      }

      // return () => {
      //   ws.current.close();
      // }
    }
  }, [userName, roomName])

  useEffect(() => {
    console.log(sendingMessage);
    if (ws.current && sendingMessage) {
      // console.log(sendingMessage)
      const msg = {
        id: "sendChat",
        userName: userName,
        roomName: roomName,
        chat: sendingMessage
      }
      sendMessage(msg);
    }
  }, [sendingMessage])
  
  
  return (
    <NormalSessionDiv>
      <IdeArea />
      <SideArea />
      <ToolBar />
    </NormalSessionDiv>
  );
}

export default NormalSession;