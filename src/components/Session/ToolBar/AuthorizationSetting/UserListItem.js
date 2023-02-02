import { useState } from "react";
import { CustomButton } from "../ToolBar";


function UserListItem(props) {
  const [participant, setParticipant] = useState(props.participant);

  function handleAuthorization(user, authorizationType) {
    user.onAuthorizationControl(authorizationType);
    setParticipant({...user});
  }

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