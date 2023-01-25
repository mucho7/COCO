// import styled from "styled-components";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from "@mui/material/FormLabel";
import Stack from '@mui/material/Stack';

import { useState } from 'react';
import { useDispatch } from "react-redux";
import { onCompileSubmit } from "../../../../store/compileSlice";


function CompileForm() {
  const dispatch = useDispatch();
  
  const [testInput, setTestInput] = useState("");
  const [isContainVisualization, setIsContainVisualization] = useState(false);
  const [variable, setVariable] = useState("");
  const [line, setLine] = useState(0);
  const [iterationVariableVector, setIterationVariableVector] = useState([]);
  const [iterationVariable, setIterationVariable] = useState("");
  
  function submitCompile(event) {
    setIterationVariableVector(iterationVariableVector.push(event.target.value));
    const payload = {
      isCompileSubmit: true,
      testInput, isContainVisualization, variable, line, iterationVariable
    }

    event.preventDefault();
    dispatch(onCompileSubmit(payload));
  }

  function handleChangeTestInput(event) {
    setTestInput(event.target.value);
  }
  function handleChangeVariable(event) {
    setVariable(event.target.value);
  }
  function handleChangeLine(event) {
    setLine(Number(event.target.value));
  }
  function handleChangeIterationVariableVector(event) {
    setIterationVariable(event.target.value);
  }
  function resetForm() {
    setTestInput("");
    setIsContainVisualization(false);
    setVariable("");
    setLine(0);
    setIterationVariableVector([]);

    const payload = {
      isCompileSubmit: false,
      testInput, isContainVisualization, variable, line, iterationVariable
    }
    dispatch(onCompileSubmit(payload));
  }

  
  const visualizeForm = (
    <Box>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="variable"
          label="변수명"
          value={variable}
          onChange={handleChangeVariable}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="line"
          label="라인 선택"
          value={line}
          onChange={handleChangeLine}
        />
      </Grid>
      <Grid item xs={12} id="iterationVariableVector">
        <TextField
          required
          fullWidth
          id="iterationVariable"
          label="반복 변수"
          value={iterationVariable}
          onChange={handleChangeIterationVariableVector}
        />
      </Grid>
    </Box>
  )

  return (
    <Container component="main" maxWidth="xs" sx={{ position: "absolute", right: "25%", bgcolor: "#4A4E69" }}>
      <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={submitCompile}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="testInput"
              label="예제 입력"
              multiline
              maxRows={4}
              value={testInput}
              onChange={handleChangeTestInput}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel id="isContainVisualization">변수 시각화</FormLabel>
            <RadioGroup row>
              <FormControlLabel value="사용" control={<Radio />} label="사용" onClick={() => setIsContainVisualization(true)}/>
              <FormControlLabel value="미사용" control={<Radio />} label="미사용" onClick={() => setIsContainVisualization(false)}/>
            </RadioGroup>
          </Grid>
          {isContainVisualization && visualizeForm}
        </Grid>
        <Stack direction="row" spacing={1}>
          <Button
            type="submit"
            variant="contained"
          >
            제출
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={resetForm}
          >
            초기화
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default CompileForm;


