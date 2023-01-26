import styled from "styled-components";


const ChatListDiv = styled.div`
  flex: 8;
  background-color: #4A4E69;
  color: white;
`

function ChatList() {
  return (
    <ChatListDiv>
      <p>채팅 목록</p>
    </ChatListDiv>
  )
}

export default ChatList;