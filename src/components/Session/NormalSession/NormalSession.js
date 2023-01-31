import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createWebsocket } from "../../../store/sessionSlice";

import IdeArea from "../IdeArea";
import SideArea from "../SideArea";
import ToolBar from "../ToolBar";

let kurentoUtils = require("kurento-utils");


const NormalSessionDiv = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-template-rows: 11fr 1fr;
  width: 100vw;
  height: 100vh;
`;


function NormalSession(props) {
  const dispatch = useDispatch();
  let ws = useRef(null);
  
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.resizeTo(1600, 900)
    });

    if (!ws.current) {
      ws.current = new WebSocket("ws://" + window.location.host + "/normal")
      ws.current.onpen = () => {
        console.log(ws.current);
      }
      let participants = {};
      let name;
      // console.log(ws);
  
      ws.onmessage = function(message) {
        let parsedMessage = JSON.parse(message.data);
        console.info("received message: " + message.data);
  
        switch (parsedMessage.id) {
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
          default:
            console.error('Unrecognized message', parsedMessage);
        }
      }

      function noticeChat(user, chat) {
          let li = document.createElement('li')
          let text = document.createTextNode(`${user}: ${chat}`)
          li.appendChild(text)
          // ulChat.appendChild(li)
      }
  
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
  
      function sendMessage(message) {
        var jsonMessage = JSON.stringify(message);
        console.log('Sending message: ' + jsonMessage);
        ws.send(jsonMessage);
      }
      return () => {
        ws.current.close();
      }
    }
    // console.log(ws.current)
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