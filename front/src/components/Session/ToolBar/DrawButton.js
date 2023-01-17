import { useState } from "react";
import { CustomButton } from "./ToolBar";


function DrawButton(props) {
  const [on, setOn] = useState(false)
  return (
    <CustomButton onClick={() => setOn(!on)} on={on}>
      그림
    </CustomButton>
  );
}

export default DrawButton;