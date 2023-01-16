import styled from "styled-components";

import ParticipantsInfoBar from "./ParticipantsInfoBar";


const ChatAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #4A4E69;
  display: flex;
  flex-direction: column;
  flex: 7;
  width: 100%;
`;

function ChatArea(props) {
  return (
    <ChatAreaDiv>
      <ParticipantsInfoBar />
      <h1>Chat Area</h1>
    </ChatAreaDiv>
  );
}

export default ChatArea;