import styled from "styled-components";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import { onChangeCode } from "../../../store/compileSlice";
import { useSelector, useDispatch } from "react-redux";

// import DrawLayer from "./DrawLayer";
import DrawLayer from "./testlayer";


const IdeAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #14213D;
  color: white;
  position: relative;
`;


function IdeArea(props) {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);

  function handleChangeCode(event) {
    setCode(event.target.value);
    dispatch(onChangeCode(event.target.value));
  }

  return (
    <IdeAreaDiv>
      {isDrawButtonOn && <DrawLayer />}
      <h1>IDE Area</h1>
      <TextField
        label="메세지를 입력하세요."
        multiline
        maxRows={20}
        sx={{ m: 2, width: "75%", ' .MuiOutlinedInput-root': {
          color: 'white',
          }, }}
        value={code}
        onChange={handleChangeCode}
      />
    </IdeAreaDiv>
  );
}

export default IdeArea;