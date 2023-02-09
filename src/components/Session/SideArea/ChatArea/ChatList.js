import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";


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
  
  // 새로운 메시지가 도착하면 채팅창에 표시
  useEffect(() => {
    if (newMessage?.id !== "") {
      const ul = document.querySelector("#chatList");
      const li = document.createElement("li");
      switch (newMessage.id) {
        case "newUser":
          li.innerText = `${newMessage.user} 님이 방에 입장했습니다.`;
          break;
        case "userLeft":
          li.innerText = `${newMessage.user} 님이 방을 떠났습니다.`;
          break;
        case "chat":
          li.innerText = `${newMessage.user} : ${newMessage.chat}`;
          break;
        default:
          break;
      }
      ul.appendChild(li);
    }
  }, [newMessage])

  const chatBox = document.querySelector("#chatBox");
  // chatBox.addEventListener("scroll", () => {
    
  // })

  return (
    <ChatListDiv id="chatBox">
      <ul id="chatList">

      </ul>
      {/* <div ref={message}></div> */}
    </ChatListDiv>
  )
}

export default ChatList;