import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { onClickMicButton } from "../../../store/toolBarActionSlice";

import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';


function MicButton(props) {
  const isMicButtonOn = useSelector((state) => state.toolBarAction.isMicButtonOn);
  const isMicPossible = useSelector((state) => state.session.isMicPossible);
  
  const dispatch = useDispatch();

  return (
    <CustomButton 
      onClick={() => {dispatch(onClickMicButton());}} 
      isButtonOn={isMicButtonOn}
      disabled={!isMicPossible}
    >
      음성
    </CustomButton>
  );
}

export default MicButton;