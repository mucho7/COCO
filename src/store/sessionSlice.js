import { createSlice } from "@reduxjs/toolkit";


// export const websocketConnected = createAsyncThunk(
//   'websocket/connected',
//   async (socket, { dispatch, getState }) => {
//     const ws = new WebSocket("ws://localhost:3000");

//     ws.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     ws.oncles = () => {
//       console.log("Websocket disconnected");
//     };
//     // const ws = socket;
//     return ws;
//   }
// );

// non-serializable object는 스토에에 직접 저장할 수 없으므로 Map을 사용하여 특정 id와 매핑한다
// 스토어에는 이 id값을 저장
// 세션에서 만들어진 웹소켓을 스토어에 매핑
export const websocketInstances = new Map();
// 참여자 목록을 스토어에 매핑
export const participantsInstances = new Map();

// const createWebsocket = (websocketId, url) => {
//   const websocket = new WebSocket(url);
//   websocketInstances.set(websocketId, websocket);
//   return {
//     type: "WEBSOCKET_CREATED",
//     payloal: { websocketId },
//   };
// };

const initialState = {
  newMessage: {},
  sendMessage: "",
  userName: "",
  roomName: "",
  websocketId: null,
  participantsId: null
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
    },
    // setWs(state, action) {
    //   state.ws = action.payload;
    // },
    setWebsocketId(state, action) {
      state.websocketId = action.payload;
    },
    setParticipantsId(state, action) {
      state.participantsId = action.payload;
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(websocketConnected.fulfilled, (state, action) => {
  //     state.ws = action.payload;
  //   });
  // },
});

export const { sendChat, receiveChat, setSocketInfo, setWebsocketId, setParticipantsId } = sessionSlice.actions;

export default sessionSlice;