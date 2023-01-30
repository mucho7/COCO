import styled from "styled-components";
import { useRef, useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'


const ChatListDiv = styled.div`
  flex: 8;
  background-color: #4A4E69;
  color: white;
  overflow: auto;
  padding: 5px 10px;
`

function ChatList(props) {
  // const scrollRef = useRef();
  const chatList = props.chatList;

  // useEffect(() => {
  //   scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  // }, [chatList])
  
  return (
    <ChatListDiv>
      <ScrollToBottom className={{height: "60%", width: "90%", overflow: "auto"}}>
        {
          chatList.map((chat, index) => {
            return <p key={index}>{chat}</p>
          })
        }
      </ScrollToBottom>
    </ChatListDiv>
  )
}

export default ChatList;