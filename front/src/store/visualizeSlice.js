import { createSlice } from "@reduxjs/toolkit";


const visualizationSlice = createSlice({
  name: 'visualizationSlice',
  initialState: { isFormOn: false },
  reducers: {
    onClickVisualizeButton: (state, action) => {
      state.isFormOn = !state.isFormOn;
    }
  }
});

export default visualizationSlice;
export const {onClickVisualizeButton} = visualizationSlice.actions;