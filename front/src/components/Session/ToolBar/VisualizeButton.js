import { useDispatch } from "react-redux";
import { onClickVisualizeButton } from "../../../store/visualizeSlice";
import { useState } from "react";
import { CustomButton } from "./ToolBar";


function VisualizeButton(props) {
  const dispatch = useDispatch();
  const [on, setOn] = useState(false)
  return (
    <CustomButton 
      onClick={() => {
        setOn(!on);
        dispatch(onClickVisualizeButton());
      }}
      on={on}
    >
      시각
    </CustomButton>
  );
}

export default VisualizeButton;