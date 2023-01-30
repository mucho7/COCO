import { createSlice } from "@reduxjs/toolkit";

const initialState = { isVisualizeSubmit: false }

const visualizeSlice = createSlice({
  name: 'visualize',
  initialState,
  reducers: {
    onVisualizeSubmit: (state) => {
      state.isVisualizeSubmit = !state.isVisualizeSubmit;
    }
  }
});

export default visualizeSlice;
export const {onVisualizeSubmit} = visualizeSlice.actions;