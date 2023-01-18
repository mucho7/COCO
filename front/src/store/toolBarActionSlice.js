import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCompileButtonOn: false,
  isVisualizeButtonOn: false,
  isDrawButtonOn: false,
  isMicButtonOn: false,
  isAuthorizeButtonOn: false,
  isChatButtonOn: false,
  isQuitButtonClicked: false,
};

const toolBarActionSlice = createSlice({
  name: 'toolBarAction',
  initialState,
  reducers: {
    onClickCompileButton(state) {
      state.isCompileButtonOn = !state.isCompileButtonOn;
      if (state.isCompileButtonOn) {
        state.isVisualizeButtonOn = false;
      }
    },
    onClickVisualizeButton(state) {
      state.isVisualizeButtonOn = !state.isVisualizeButtonOn;
      if (state.isVisualizeButtonOn) {
        state.isCompileButtonOn = false;
      }
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

export default toolBarActionSlice;
export const { 
  onClickCompileButton, 
  onClickVisualizeButton, 
  onClickDrawButton,
  onClickMicButton,
  onClickAuthorizeButton,
  onClickChatButton,
  onClickQuitButton
} = toolBarActionSlice.actions;