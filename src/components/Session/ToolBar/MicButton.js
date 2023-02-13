import { useSelector, useDispatch } from "react-redux";
import { onClickMicButton } from "../../../store/toolBarActionSlice";

import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import IconButton from '@mui/material/IconButton';


function MicButton(props) {
  const isMicButtonOn = useSelector((state) => state.toolBarAction.isMicButtonOn);
  const isMicPossible = useSelector((state) => state.session.isMicPossible);
  
  const dispatch = useDispatch();

  return (
    <IconButton 
      type="button"
      onClick={() => {dispatch(onClickMicButton())}} 
      disabled={!isMicPossible}
      sx={{ 
        width: "50px", 
        height: "50px", 
        m: '5px', 
        p: '5px', 
        bgcolor: isMicButtonOn ? "#FCA311" : "#E5E5E5" 
      }}
    >
      {isMicButtonOn ? <MicNoneOutlinedIcon fontSize="large" /> : <MicOffOutlinedIcon fontSize="large" />}
    </IconButton>
  );
}

export default MicButton;