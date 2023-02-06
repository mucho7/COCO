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
    onToggleAuthorization(state, action) {
      switch (action.payload) {
        case "compile":
          state.isCompilePossible = !state.isCompilePossible;
          if (state.isCompileButtonOn) {
            state.isCompileButtonOn = !state.isCompileButtonOn;
          }
          break;
          case "draw":
            state.isDrawPossible = !state.isDrawPossible;
            if (state.isDrawButtonOn) {
              state.isDrawButtonOn = !state.isDrawButtonOn;
            }
            break;
            case "mic":
              state.isMicPossible = !state.isMicPossible;
              if (state.isMicButtonOn) {
                state.isMicButtonOn = !state.isMicButtonOn;
              }
          break;
        default:
          break;
      }
    }
  }
});

export default toolBarActionSlice;
export const { 
  onClickCompileButton, 
  onClickDrawButton,
  onClickMicButton,
  onClickAuthorizeButton,
  onClickChatButton,
  onClickQuitButton,
  onToggleAuthorization
} = toolBarActionSlice.actions;