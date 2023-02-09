import { useState, useEffect } from "react";
import { websocketInstances, setUpdated } from "../../../../store/sessionSlice";
import { onToggleAuthorization } from "../../../../store/toolBarActionSlice";
import { CustomButton } from "../ToolBar";
import { useDispatch, useSelector } from "react-redux";


function UserListItem(props) {
  const participant = props.participant;
  const websocketId = useSelector((state) => state.session.websocketId);
  const ws = websocketInstances.get(websocketId);


  function toggleAuthorization(user, authorizationType) {
    const message = {
      id: "toggleAuthorization",
      userName: user.name,
      authorizationType: authorizationType
    }

    ws.send(JSON.stringify(message));
  }
  

  return (
    <div>
      {participant.name}
      <CustomButton 
        onClick={() => toggleAuthorization(participant, "compile")} 
        isButtonOn={participant.authorization.isCompilePossible}
      >
        컴파
      </CustomButton>
      <CustomButton 
        onClick={() => toggleAuthorization(participant, "draw")} 
        isButtonOn={participant.authorization.isDrawPossible}
      >
        그림
      </CustomButton>
      <CustomButton 
        onClick={() => toggleAuthorization(participant, "mic")} 
        isButtonOn={participant.authorization.isMicPossible}
      >
        음성
      </CustomButton>
    </div>
  );
}

export default UserListItem;