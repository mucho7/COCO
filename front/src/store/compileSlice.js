import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { 
  isCompileSubmit: false,
  code: "",
  isContainVisualization: false,
  testInput: "",
  visualizationDto: {
    variable: "",
    line: 0,
    iterationVariableVector: []
  }
}

const compileSlice = createSlice({
  name: 'compile',
  initialState,
  reducers: {
    onChangeCode: (state, action) => {
      state.code = action.payload;
    },
    onCompileSubmit: (state, action) => {
      state.isCompileSubmit = action.payload.isCompileSubmit;
      state.isContainVisualization = action.payload.isContainVisualization;
      state.testInput = action.payload.testInput;
      state.visualizationDto.variable = action.payload.variable;
      state.visualizationDto.line = action.payload.line;
      state.visualizationDto.iterationVariableVector = [action.payload.iterationVariable];
      
      axios.post("http://172.30.48.1:8080/", {
          code: state.code,
          isContainVisualization: state.isContainVisualization,
          visualizationDto: state.visualizationDto
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
});

export default compileSlice;
export const {onCompileSubmit, onChangeCode} = compileSlice.actions;