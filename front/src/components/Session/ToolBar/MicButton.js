import { CustomButton } from "./ToolBar";
import { useState } from "react";


function MicButton(props) {
  const [on, setOn] = useState(false)
  return (
    <CustomButton onClick={() => setOn(!on)} on={on}>
      음성
    </CustomButton>
  );
}

export default MicButton;