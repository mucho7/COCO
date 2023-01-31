import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ScrollToBottom from 'react-scroll-to-bottom'

import { receiveChat } from "../../../../store/sessionSlice";


const ChatListDiv = styled.div`
  flex: 8;
  background-color: #4A4E69;
  color: white;
  overflow: auto;
  padding: 5px 10px;
`

function ChatList(props) {
  // const scrollRef = useRef();
  // const chatList = props.chatList;
  const dispatch = useDispatch();

  const newMessage = dispatch(receiveChat());
  useEffect(() => {
    if (typeof newMessage === String) {
      noticeChat(newMessage);
    }
  }, [newMessage])

  function noticeChat(chat) {
    let ul = document.querySelector("#chatList");
    let li = document.createElement("li");
    let text = document.createTextNode(`${chat}`);
    li.appendChild(text);
    ul.appendChild(li);
    console.log(chat)
  }
  
  return (
    <ChatListDiv>
      <ScrollToBottom>
        <ul id="chatList">

        </ul>
      </ScrollToBottom>
    </ChatListDiv>
  )
}

export default ChatList;