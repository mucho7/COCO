import { createSlice } from "@reduxjs/toolkit";

let ws;

const initialState = {

};

const kurentoUtils = require("kurento-utils");

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    createWebsocket(state, action) {
      ws = new WebSocket('wss://' + window.location.host + '/groupcall');
    },
    sendChat(state, action) {
      let roomName = "testRoomName";
      let userName = "testUserName";
      let chat = action.payload;

      let message = {
        id: "sendChat",
        userName,
        roomName,
        chat,
      }

      let jsonMessage = JSON.stringify(message);
      
      ws?.send(jsonMessage);
    },
    receiveChat(state, action) {
      if (ws) {
        ws.onmessage = function(message) {
          let parsedMessage = JSON.parse(message.data);
          switch (parsedMessage.id) {
            case "sendChat":
              let newMessage = parsedMessage.chat
              return newMessage
            default:
              return null
          }
        }
      }
    }
  }
});

export const { createWebsocket, sendChat, receiveChat } = sessionSlice.actions;

export default sessionSlice;