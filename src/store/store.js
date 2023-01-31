import { configureStore } from "@reduxjs/toolkit";
import authorizationSettingSlice from "./authorizationSettingSlice";
import sessionListSlice from "./sessionListSlice";
import toolBarActionSlice from "./toolBarActionSlice";
import compileSlice from "./compileSlice";
import sessionSlice from "./sessionSlice";

const store = configureStore({
  reducer: {
    compile: compileSlice.reducer,
    authorizationSetting: authorizationSettingSlice.reducer,
    sessionList: sessionListSlice.reducer,
    toolBarAction: toolBarActionSlice.reducer,
    session: sessionSlice.reducer
  }
})

export default store;