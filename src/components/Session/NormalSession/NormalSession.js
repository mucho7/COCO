import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { receiveChat, websocketInstances, setWebsocketId, setParticipantsId, participantsInstances, receiveImageData, setUpdated, setIsCompilePossible, setIsDrawPossible, setIsMicPossible, setCountUsers } from "../../../store/sessionSlice";

import IdeArea from "../IdeArea";
import SideArea from "../SideArea";
import ToolBar from "../ToolBar";
import adapter from "webrtc-adapter";

let kurentoUtils = require("kurento-utils");
// const adapter = require("webrtc-adapter");

// grid-template-columns: 9fr 3fr;
// grid-template-rows: 11fr 1fr;

const NormalSessionDiv = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(12, 1fr);
  width: 100vw;
  height: 100vh;
`;


function NormalSession(props) {
  let ws = useRef(null);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.session.userName);
  // const roomName = useSelector((state) => state.session.roomName);
  // const userName = window.localStorage.getItem("userId");
  const { roomId } = useParams();
  const roomName = roomId
  console.log(roomName)

  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
      
  useEffect(() => {
    // window.addEventListener("resize", () => {
    //   window.resizeTo(1600, 900)
    // });

    let participants = {};

    // 웹소켓 서버로 메세지 보내기
    function sendMessage(message) {
      let jsonMessage = JSON.stringify(message);
      console.log('Sending message: ' + jsonMessage);
      ws.current.send(jsonMessage);
    }
  
    // 웹소켓 서버에 userName가 roomName에 참여했음을 등록
    function register() {
      let message = {
        id : 'joinRoom',
        name : userName,
        room : roomName,
      }
      sendMessage(message);
    }
  
    // 웹소켓 서버로부터 noticeChat 메세지를 받는 경우(누군가가 입력한 채팅을 채팅창에 띄우기 위해 메세지 수신)
    function noticeChat(user, chat) {
      const newChatMessage = {
        id: "chat",
        user: user,
        chat: chat
      }
      dispatch(receiveChat(newChatMessage));
    }

    function countUsers() {
      let count = Object.keys(participants).length;
      dispatch(setCountUsers(count));
    }

    // 세션 컴포넌트 마운트시 웹소켓 생성하고 register 함수를 통해 서버에 등록
    if (!ws.current) {
      // ws.current = new WebSocket("wss://localhost:8443/groupcall");
      ws.current = new WebSocket(`wss://${window.location.host}:8443/groupcall`);
      // console.log(ws.current);
      ws.current.addEventListener('error', (event) => {
        console.log('WebSocket error: ', event);
      });
      ws.current.onopen = () => {
        console.log(ws.current);
        register();
      }
      
      websocketInstances.set(1, ws.current);
      dispatch(setWebsocketId(1));
      console.log(participants);
  
      // 서버로부터 메시지 수신
      ws.current.onmessage = function(message) {
        let parsedMessage = JSON.parse(message.data);
        console.info("received message: " + message.data);
  
        switch (parsedMessage.id) {
          case 'existingParticipants':
            onExistingParticipants(parsedMessage);
            countUsers();
            participantsInstances.set(1, participants);
            dispatch(setParticipantsId(1));
            break;
          case 'newParticipantArrived':
            onNewParticipant(parsedMessage);
            countUsers();
            break;
          case 'participantLeft':
            onParticipantLeft(parsedMessage);
            countUsers();
            break;
          case 'receiveVideoAnswer':
            receiveVideoResponse(parsedMessage);
            console.log("after receiveVideoResponse: ", participants)
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
          case "toggleAuthorization":
            toggleAuthorization(parsedMessage.userName, parsedMessage.authorizationType);
            break;
          case "sendImageData":
            dispatch(receiveImageData(parsedMessage));
            console.log("Receive ImageData")
            console.log(parsedMessage)
            break;
          default:
            console.error('Unrecognized message', parsedMessage);
        }
      }

      // 새 참여자 입장
      function onNewParticipant(request) {
        receiveVideo(request.name);
        const newUserMessage = {
          id: "newUser",
          user: request.name,
          chat: ""
        }
        dispatch(receiveChat(newUserMessage));
      }

      function receiveVideoResponse(result) {
        participants[result.name].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
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

      // 참여자들과 시그널링 & 미디어 정보 수신
      function onExistingParticipants(msg) {
        let constraints = {
          audio : true,
          video: {
            mandatory : {
              maxWidth : 320,
              maxFrameRate : 15,
              minFrameRate : 15
           }
          }
          // 크롬 브라우저의 버그(?) 때문에 video를 false로 설정할 수 없는 것 같음
          // video: false
        };
        console.log(userName + " registered in room " + roomName);
        var participant = new Participant(userName);
        participants[userName] = participant;
        console.log("participants: ", participants)
        // var video = participant.getVideoElement();
      
        var options = {
              // localVideo: video,
              // localVideo: null,
              mediaConstraints: constraints,
              onicecandidate: participant.onIceCandidate.bind(participant),
            }
        participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
          function (error) {
            if(error) {
              return console.error(error);
            }
            this.generateOffer (participant.offerToReceiveVideo.bind(participant));
        });
      
        msg.data.forEach(receiveVideo);
      }

      function leaveRoom() {
        for ( var key in participants) {
          participants[key].dispose();
        }
      
        ws.current.close();
      }

      function receiveVideo(sender) {
        console.log("receiveVideo executed?")
        let participant;
        if (!participants[sender]) {
          participant = new Participant(sender);
          participants[sender] = participant;
        } else {
          participant = participants[sender];
        }
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
        });
      }

      function onParticipantLeft(request) {
        console.log('Participant ' + request.name + ' left');
        var participant = participants[request.name];
        participant.dispose();
        delete participants[request.name];
        const userLeftMessage = {
          id: "userLeft",
          user: request.name,
          chat: ""
        }
        dispatch(receiveChat(userLeftMessage));
      }

      // 권한 변경 이벤트에 반응
      function toggleAuthorization(targetUserName, authorizationType) {
        let participant = participants[targetUserName]
        if (userName === targetUserName) {
          switch (authorizationType) {
            case "compile":
              dispatch(setIsCompilePossible());
              break;
            case "draw":
              dispatch(setIsDrawPossible());
              break;
            case "mic":
              participant.rtcPeer.audioEnabled = !participant.rtcPeer.audioEnabled;
              dispatch(setIsMicPossible());
              break;
            case "drawButton":
              break;
            default:
              break;
          }
        }
        participant.onToggleAuthorization(authorizationType);
        participants[targetUserName] = participant;
        participantsInstances.set(1, participants);
        dispatch(setUpdated(true));
        console.log("after onToggleAuth: ", participant.authorization)
      }

  
      ////////////////////////////////////////////////////////
      // participant 객체 정의하는 부분

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
        this.rtcPeer = null;
        // 호스트 여부
        this.isHost = (name==="admin") ? true : false;
        // 권한 목록
        this.authorization = { 
          isCompilePossible: this.isHost, 
          isMicPossible: true,
          isDrawPossible: true
        }
        // 캔버스 관리를 위해 isDrawButtonOn도 속성으로 관리
        this.isDrawButtonOn = false;
        this.onToggleAuthorization = function(authorizationType) {
          switch (authorizationType) {
            case "compile":
              this.authorization.isCompilePossible = !this.authorization.isCompilePossible;
              break;
            case "mic":
              this.authorization.isMicPossible = !this.authorization.isMicPossible;
              // console.log(this.rtcPeer);
              // console.log(this.rtcPeer.peerConnection)
              break;
            case "draw":
              this.authorization.isDrawPossible = !this.authorization.isDrawPossible;
              break;
            case "drawButton":
              this.isDrawButtonOn = !this.isDrawButtonOn;
              break;
            default:
              break;
          }
        }

        var container = document.createElement('div');
        container.className = isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
        container.id = name;
        var span = document.createElement('span');
        var video = document.createElement('video');

        container.appendChild(video);
        container.appendChild(span);
        container.onclick = switchContainerClass;
        // document.getElementById('participants').appendChild(container);

        // span.appendChild(document.createTextNode(name));

        video.id = 'video-' + name;
        video.autoplay = true;
        video.controls = false;


        this.getElement = function() {
          return container;
        }

        this.getVideoElement = function() {
          return video;
        }

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
        };
      }
    }
  }, [dispatch, isDrawButtonOn, roomName, userName])

  useEffect(() => {
    return () => {
      ws.current.close();
    }
  }, [])
  
  return (
    <NormalSessionDiv>
      <IdeArea />
      <SideArea />
      <ToolBar />
    </NormalSessionDiv>
  );
}

export default NormalSession;