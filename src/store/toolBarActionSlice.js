import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCompileButtonOn: false,
  isDrawButtonOn: false,
  isMicButtonOn: false,
  isAuthorizeButtonOn: false,
  isChatButtonOn: false,
  isQuitButtonClicked: false,
  isCompilePossible: true,
  isDrawPossible: true,
  isMicPossible: true
};

const toolBarActionSlice = createSlice({
  name: 'toolBarAction',
  initialState,
  reducers: {
    onClickCompileButton(state) {
      state.isCompileButtonOn = !state.isCompileButtonOn;
    },
    onClickDrawButton(state) {
      state.isDrawButtonOn = !state.isDrawButtonOn;
    },
    onClickMicButton(state) {
      state.isMicButtonOn = !state.isMicButtonOn;
    },
    onClickAuthorizeButton(state) {
      state.isAuthorizeButtonOn = !state.isAuthorizeButtonOn;
    },
    onClickChatButton(state) {
      state.isChatButtonOn = !state.isChatButtonOn;
    },
    onClickQuitButton(state) {
      state.isQuitButtonOn = !state.isQuitButtonOn;
    },
  }
});

export const { 
  onClickCompileButton, 
  onClickDrawButton,
  onClickMicButton,
  onClickAuthorizeButton,
  onClickChatButton,
  onClickQuitButton,
} = toolBarActionSlice.actions;

export default toolBarActionSlice;