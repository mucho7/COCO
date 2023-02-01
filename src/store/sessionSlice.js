import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  newMessage: {},
  sendMessage: "",
  userName: "",
  roomName: ""
};



const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sendChat(state, action) {
      // console.log(action.payload)
      state.sendMessage = action.payload;
    },
    receiveChat(state, action) {
      state.newMessage = action.payload;
    },
    setSocketInfo(state, action) {
      // console.log(action.payload.userName)
      state.userName = action.payload.userName;
      state.roomName = action.payload.roomName;
      // console.log(state.userName)
    }
  }
});

export const { sendChat, receiveChat, setSocketInfo } = sessionSlice.actions;

export default sessionSlice;