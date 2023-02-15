import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionList: [{ id: 1, title: "dummy", content: "initial dummy content", mode: "normal"}],
};

const sessionListSlice = createSlice({
  name: "sessionList",
  initialState,
  reducers: {
    createSession(state, action) {
      const { title, content, mode } = action.payload
      const id = state.sessionList.length + 1
      const newSession = {
        id, title, content, mode
      }
      state.sessionList.push(newSession);
    },
    deleteSession(state, action) {
      const idx = action.payload;
      state.sessionList = state.sessionList.splice(state.sessionList, idx);
    }
  }
});

export const {createSession, deleteSession} = sessionListSlice.actions;

export default sessionListSlice;