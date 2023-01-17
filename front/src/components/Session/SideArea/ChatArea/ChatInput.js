import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';


const boxSx = {
  display: 'flex',
  alignItems: 'center',
  gridTemplateColumns: '5fr 1fr',
  p: 1,
}


function ChatInputBox() {
  return (
    <TextField
      label="메세지를 입력하세요."
      multiline
      maxRows={4}
      sx={{ flexGrow: 1, mr: 1 }}
    />
  )
}

const ChatSubmitButton = styled.button`
  border: 2px solid #FCA311;
  background-color: #FCA311;
  border-radius: 50%;
  height: 30px;
  width: 30px;
`

function ChatInput() {
  return (
    <Box component="form" sx={boxSx}>
      <ChatInputBox />
      <ChatSubmitButton />
    </Box>
  )
}

export default ChatInput;