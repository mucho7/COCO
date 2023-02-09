import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import { useState } from "react";
import { useSelector } from "react-redux";

import { websocketInstances } from "../../../../store/sessionSlice";


const boxSx = {
  display: 'flex',
  alignItems: 'center',
  gridTemplateColumns: '5fr 1fr',
  p: 1,
}

const ChatSubmitButton = styled.button`
  border: 2px solid #FCA311;
  background-color: #FCA311;
  border-radius: 50%;
  height: 30px;
  width: 30px;
`

function ChatInput(props) {
  const [chatInput, setChatInput] = useState("");
  const websocketId = useSelector((state) => state.session.websocketId);
  const ws = websocketInstances.get(websocketId);
  const userName = useSelector((state) => state.session.userName);
  const roomName = useSelector((state) => state.session.roomName);

  function handleChangeChatInput(event) {
    setChatInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const message = {
      id: "sendChat",
      userName: userName,
      roomName: roomName,
      chat: chatInput
    }
    ws.send(JSON.stringify(message));
    setChatInput("");
  }

  return (
    <Box component="form" sx={boxSx} onSubmit={(event) => handleSubmit(event)}>
      <TextField
        id="chat"
        name="chat"
        autoComplete="chat"
        label="메세지를 입력하세요."
        multiline
        maxRows={4}
        sx={{ flexGrow: 1, mr: 1 }}
        value={chatInput}
        onChange={handleChangeChatInput} 
      />
      <ChatSubmitButton type="submit" />
    </Box>
  )
}

export default ChatInput;