import { configureStore } from "@reduxjs/toolkit";
import visualizationSlice from "./visualizeSlice";
import authorizationSettingSlice from "./authorizationSettingSlice";

const store = configureStore({
  reducer: {
    visualization: visualizationSlice.reducer,
    authorizationSetting: authorizationSettingSlice.reducer
  }
})

export default store;