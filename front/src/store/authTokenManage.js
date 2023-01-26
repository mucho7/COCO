import { createSlice } from "@reduxjs/toolkit";


const authTokenManage = createSlice({
  name: 'authorizationSettingSlice',
  initialState: { isAuthorizationSettingOn: false },
  reducers: {
    onClickAuthorizationSettingButton: (state, action) => {
      state.isAuthorizationSettingOn = action.payload
    }
  }
});

export default authTokenManage;
export const {onClickAuthorizationSettingButton} = authorizationSettingSlice.actions;