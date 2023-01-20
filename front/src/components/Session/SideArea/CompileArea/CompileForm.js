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

  function submitCompile(event) {
    const submitData = {
      testInput, useVisualize, variableName, selectLine, iterationVariable
    }

    const payload = {
      isCompileSubmit: true,
      submitData,
    }

    event.preventDefault();
    dispatch(onCompileSubmit(payload));

  }

  const [testInput, setTestInput] = useState("");
  const [useVisualize, setUseVisualize] = useState(false);
  const [variableName, setVariableName] = useState("");
  const [selectLine, setSelectLine] = useState("");
  const [iterationVariable, setIterationVariable] = useState("");


  function handleChangeTestInput(event) {
    setTestInput(event.target.value);
  }
  function handleChangeVariableName(event) {
    setVariableName(event.target.value);
  }
  function handleChangeSelectLine(event) {
    setSelectLine(event.target.value);
  }
  function handleChangeIterationVariable(event) {
    setIterationVariable(event.target.value);
  }
  function resetForm() {
    setTestInput("");
    setUseVisualize(false);
    setVariableName("");
    setSelectLine("");
    setIterationVariable("");
    const submitData = {
      testInput, useVisualize, variableName, selectLine, iterationVariable
    }
    const payload = {
      isCompileSubmit: false,
      submitData
    }
    dispatch(onCompileSubmit(payload));
  }

  
  const visualizeForm = (
    <Box>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="variableName"
          label="변수명"
          value={variableName}
          onChange={handleChangeVariableName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="selectLine"
          label="라인 선택"
          value={selectLine}
          onChange={handleChangeSelectLine}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="iterationVariable"
          label="반복 변수"
          value={iterationVariable}
          onChange={handleChangeIterationVariable}
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
              id="testCase"
              label="예제 입력"
              multiline
              maxRows={4}
              value={testInput}
              onChange={handleChangeTestInput}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel id="useVisualize">변수 시각화</FormLabel>
            <RadioGroup row>
              <FormControlLabel value="사용" control={<Radio />} label="사용" onClick={() => setUseVisualize(true)}/>
              <FormControlLabel value="미사용" control={<Radio />} label="미사용" onClick={() => setUseVisualize(false)}/>
            </RadioGroup>
          </Grid>
          {useVisualize && visualizeForm}
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


