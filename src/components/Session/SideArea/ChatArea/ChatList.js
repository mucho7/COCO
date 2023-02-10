import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import ReceivedChatItem from "./ReceivedChatItem";
import MyChatItem from "./MyChatItem";
import InformationMessage from "./InformationMessage";


const ChatListDiv = styled.div`
  flex-basis: auto;
  flex-grow: 1;
  background-color: #D9D9D9;
  color: white;
  overflow: auto;
  margin: 5px 10px;
  border-radius: 15px;
  padding: 10px;
`

function ChatList(props) {
  // 서버로부터 받은 채팅 메시지 객체
  const newMessage = useSelector((state) => state.session.newMessage);
  const userId = localStorage.getItem("userId");
  
  // 새로운 메시지가 도착하면 채팅창에 표시
  useEffect(() => {
    if (newMessage?.id !== "") {
      const chatList = document.querySelector("#chatList");
      let messageItem;
      switch (newMessage.id) {
        case "newUser":
          messageItem = <InformationMessage user={newMessage.user} chat={"입장"} />
          break;
        case "userLeft":
          messageItem = <InformationMessage user={newMessage.user} chat={"퇴장"} />
          break;
        case "chat":
          if (userId === newMessage.user) {
            messageItem = <MyChatItem chat={newMessage.chat} />
          } else {
            messageItem = <ReceivedChatItem user={newMessage.user} chat={newMessage.chat} />
          }
          break;
        default:
          break;
        }
      if (messageItem) {
        chatList.appendChild(messageItem);
      }
    }
  }, [newMessage, userId])

  // const chatBox = document.querySelector("#chatBox");
  // chatBox.addEventListener("scroll", () => {
    // chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  // })

  return (
    <ChatListDiv id="chatList">
      <MyChatItem chat={"안녕하세요."} />
      <InformationMessage user={"someone"} chat={"입장"} />
      <ReceivedChatItem user={"someone"} chat={"hello"} />
      <ReceivedChatItem user={"someone"} chat={"살려줘.........@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"} />
      <MyChatItem chat={"#)$)@$(@!)$!)$&!#023102390149213$"} />
      <MyChatItem chat={"ㄴ아아ㅏㅏ다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅁㄷㅈㄱㅇㄴㅁㅎㄷㅈㄱ"} />
      <InformationMessage user={"abc"} chat={"퇴장"} />
      <ReceivedChatItem user={"someone"} chat={"ㄷㄷㄷㄷㄷㄷ@@@@ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ@@@@@@@@@@@"} />
      {/* <div ref={message}></div> */}
    </ChatListDiv>
  )
}

export default ChatList;