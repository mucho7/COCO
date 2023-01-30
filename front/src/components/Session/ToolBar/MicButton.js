import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { onClickMicButton } from "../../../store/toolBarActionSlice";


function MicButton(props) {
  const isMicButtonOn = useSelector((state) => state.toolBarAction.isMicButtonOn);
  const dispatch = useDispatch();

  return (
    <CustomButton 
      onClick={() => {dispatch(onClickMicButton());}} 
      isButtonOn={isMicButtonOn}
    >
      음성
    </CustomButton>
  );
}

export default MicButton;