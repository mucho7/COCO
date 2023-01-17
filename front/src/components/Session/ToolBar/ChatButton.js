import { CustomButton } from "./ToolBar";
import { useState } from "react";


function ChatButton(props) {
  const [on, setOn] = useState(false)
  return (
    <CustomButton onClick={() => setOn(!on)} on={on}>
      채팅
    </CustomButton>
  );
}

export default ChatButton;