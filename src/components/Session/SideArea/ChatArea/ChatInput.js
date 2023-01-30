import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import { useState } from "react";


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

function ChatInput({ handleChatSubmit }) {
  const [chatInput, setChatInput] = useState("");

  function handleChangeChatInput(event) {
    setChatInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleChatSubmit(chatInput);
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