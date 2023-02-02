import styled from "styled-components";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from "react-redux";
import { useEffect } from "react";

// import { receiveChat } from "../../../../store/sessionSlice";


const ChatListDiv = styled.div`
  flex: 8;
  background-color: #4A4E69;
  color: white;
  overflow: auto;
  padding: 5px 10px;
`

function ChatList(props) {
  // 서버로부터 받은 채팅 메시지 객체
  const newMessage = useSelector((state) => state.session.newMessage);
  
  // 새로운 메시지가 도착하면 채팅창 화면에 보여준다
  useEffect(() => {
    if (newMessage.chat) {
      const ul = document.querySelector("#chatList");
      const li = document.createElement("li");
      li.innerText = `${newMessage.user} : ${newMessage.chat}`;
      ul.appendChild(li);
    }
  }, [newMessage])

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