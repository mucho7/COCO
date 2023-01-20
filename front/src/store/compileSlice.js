import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  isCompileSubmit: false, 
  submitData: {
    testInput: "",
    useVisualize: false,
    variableName: "",
    selectLine: "",
    iterationVariable: ""
  }
}

const compileSlice = createSlice({
  name: 'compile',
  initialState,
  reducers: {
    onCompileSubmit: (state, action) => {
      state.isCompileSubmit = action.payload.isCompileSubmit;
      state.submitData = action.payload.submitData;
    }
  }
});

export default compileSlice;
export const {onCompileSubmit} = compileSlice.actions;