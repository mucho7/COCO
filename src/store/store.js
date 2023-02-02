import { configureStore } from "@reduxjs/toolkit";
import authorizationSettingSlice from "./authorizationSettingSlice";
import sessionListSlice from "./sessionListSlice";
import toolBarActionSlice from "./toolBarActionSlice";
import compileSlice from "./compileSlice";
import updateUserSlice from "./userInfoUpdateSlice"

const store = configureStore({
  reducer: {
    compile: compileSlice.reducer,
    authorizationSetting: authorizationSettingSlice.reducer,
    sessionList: sessionListSlice.reducer,
    toolBarAction: toolBarActionSlice.reducer,
    updateUser: updateUserSlice.reducer,
  }
})

export default store;