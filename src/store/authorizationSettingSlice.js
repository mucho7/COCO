import { createSlice } from "@reduxjs/toolkit";


const authorizationSettingSlice = createSlice({
  name: 'authorizationSettingSlice',
  initialState: { isAuthorizationSettingOn: false },
  reducers: {
    onClickAuthorizationSettingButton: (state, action) => {
      state.isAuthorizationSettingOn = !state.isAuthorizationSettingOn;
    }
  }
});

export default authorizationSettingSlice;
export const {onClickAuthorizationSettingButton} = authorizationSettingSlice.actions;