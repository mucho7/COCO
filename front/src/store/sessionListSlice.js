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
    }
  }
});

export const sessionListActions = sessionListSlice.actions;

export default sessionListSlice;