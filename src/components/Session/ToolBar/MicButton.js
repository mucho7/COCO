import { useSelector, useDispatch } from "react-redux";
import { onClickMicButton } from "../../../store/toolBarActionSlice";

import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import { participantsInstances } from "../../../store/sessionSlice";
import { useEffect } from "react";


function MicButton(props) {
  const isMicButtonOn = useSelector((state) => state.toolBarAction.isMicButtonOn);
  const isMicPossible = useSelector((state) => state.session.isMicPossible);
  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState(participantsInstances.get(participantsId));
  const userName = localStorage.getItem("userId")
  const dispatch = useDispatch();
  
  useEffect(() => {
    setParticipants(participantsInstances.get(participantsId));
  }, [participantsId])
  
  
  function handleClickMicButton() {
    dispatch(onClickMicButton())
    if (participants[userName]) {
      participants[userName].rtcPeer.audioEnabled = !participants[userName].rtcPeer.audioEnabled;
    }
  }

  return (
    <IconButton 
      type="button"
      onClick={handleClickMicButton} 
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