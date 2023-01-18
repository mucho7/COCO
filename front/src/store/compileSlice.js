import { createSlice } from "@reduxjs/toolkit";

const initialState = { isCompileSubmit: false }

const compileSlice = createSlice({
  name: 'compile',
  initialState,
  reducers: {
    onCompileSubmit: (state) => {
      state.isCompileSubmit = !state.isCompileSubmit;
    }
  }
});

export default compileSlice;
export const {onCompileSubmit} = compileSlice.actions;