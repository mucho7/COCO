import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { onClickMicButton } from "../../../store/toolBarActionSlice";

import { participantsInstances } from "../../../store/sessionSlice";


function MicButton(props) {
  const isMicButtonOn = useSelector((state) => state.toolBarAction.isMicButtonOn);
  const dispatch = useDispatch();

  // 
  // const userName = useSelector((state) => state.session.userName);
  // const participantsId = useSelector((state) => state.session.participantsId);
  // const [participants, setParticipants] = useState(participantsInstances.get(participantsId));
  // const [me, setMe] = useState(participants[userName]);

  return (
    <CustomButton 
      onClick={() => {dispatch(onClickMicButton());}} 
      isButtonOn={isMicButtonOn}
      // isAuthorized={me.authorization.isMicPossible}
    >
      음성
    </CustomButton>
  );
}

export default MicButton;