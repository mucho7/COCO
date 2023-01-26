import { CustomButton } from "./ToolBar";
import { useState } from "react";


function TestCompileButton(props) {
  const [on, setOn] = useState(false)
  return (
    <CustomButton onClick={() => setOn(!on)} on={on}>
      테케
    </CustomButton>
  );
}

export default TestCompileButton;