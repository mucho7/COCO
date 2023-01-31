import styled from "styled-components";

import ParticipantsInfoBar from "./ParticipantsInfoBar";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import { useState } from "react";

const ChatAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #4A4E69;
  display: flex;
  flex-direction: column;
  flex: 7;
  width: 100%;
  overflow: auto;
`;


function ChatArea(props) {
  // const [chatList, setChatList] = useState(['dsafsd', 'dfewf', 'fewgeg']);

  let message;

  function handleChatSubmit(chatInput) {
    // setChatList([...chatList, chatInput]);
    message = {
      id: "sendChat",
      chat: chatInput
    }
    // sendMessage(message);
    // noticeChat("[me]", chatInput);
  }


  return (
    <ChatAreaDiv>
      {/* 참여자 정보 인퍼페이스 */}
      <ParticipantsInfoBar />
      {/* 메세지 컨텐츠 칸 */}
      <ChatList 
        // chatList={chatList} 
      />
      {/* 메세지 입력 칸 */}
      <ChatInput handleChatSubmit={handleChatSubmit} />
    </ChatAreaDiv>
  );
}

export default ChatArea;