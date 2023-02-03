import { useState } from "react";
import { setParticipantsId, websocketInstances } from "../../../../store/sessionSlice";
import { CustomButton } from "../ToolBar";
import { useSelector } from "react-redux";


function UserListItem(props) {
  const [participant, setParticipant] = useState(props.participant);
  const websocketId = useSelector((state) => state.session.websocketId);
  const ws = websocketInstances.get(websocketId);

  function handleAuthorization(user, authorizationType) {
    // user.onAuthorizationControl(authorizationType);
    // setParticipant({...user});
    // props.handleParticipants(participant);
    const message = {
      id: "toggleAuthorization",
      userName: user.name,
      authorizationType: authorizationType
    }

    ws.send(JSON.stringify(message));
  }

  // console.log(participant.rtcPeer.peerConnection)
  // console.log(participant.rtcPeer)

  return (
    <div>
      {participant.name}
      <CustomButton 
        onClick={() => handleAuthorization(participant, "compile")} 
        isButtonOn={participant.authorization.isCompilePossible}
      >
        컴파
      </CustomButton>
      <CustomButton 
        onClick={() => handleAuthorization(participant, "draw")} 
        isButtonOn={participant.authorization.isDrawPossible}
      >
        그림
      </CustomButton>
      <CustomButton 
        onClick={() => handleAuthorization(participant, "mic")} 
        isButtonOn={participant.authorization.isMicPossible}
      >
        음성
      </CustomButton>
    </div>
  );
}

export default UserListItem;