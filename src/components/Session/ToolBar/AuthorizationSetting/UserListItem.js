import { useState, useEffect } from "react";
import { websocketInstances } from "../../../../store/sessionSlice";
import { onToggleAuthorization } from "../../../../store/toolBarActionSlice";
import { CustomButton } from "../ToolBar";
import { useDispatch, useSelector } from "react-redux";


function UserListItem(props) {
  const [participant, setParticipant] = useState(props.participant);
  const websocketId = useSelector((state) => state.session.websocketId);
  const ws = websocketInstances.get(websocketId);

  // const isCompilePossible = useSelector((state) => state.toolBarAction.isCompilePossible);
  // const isDrawPossible = useSelector((state) => state.toolBarAction.isDrawPossible);
  // const isMicPossible = useSelector((state) => state.toolBarAction.isMicPossible);

  const [isCompilePossible, setIsCompilePossible] = useState(participant.authorization.isCompilePossible);
  const [isDrawPossible, setIsDrawPossible] = useState(participant.authorization.isDrawPossible);
  const [isMicPossible, setIsMicPossible] = useState(participant.authorization.isMicPossible);
  const dispatch = useDispatch();

  async function toggleAuthorization(user, authorizationType) {
    const message = {
      id: "toggleAuthorization",
      userName: user.name,
      authorizationType: authorizationType
    }

    await ws.send(JSON.stringify(message));
    
    setIsCompilePossible(participant.authorization.isCompilePossible);
    setIsDrawPossible(participant.authorization.isDrawPossible);
    setIsMicPossible(participant.authorization.isMicPossible);
    // console.log(isCompilePossible, isDrawPossible, isMicPossible)
  }

  // useEffect(() => {
  //   console.log(`${participant.name} authorization changed`)
  // }, [isCompilePossible, isDrawPossible, isMicPossible, participant.name])

  return (
    <div>
      {participant.name}
      <CustomButton 
        onClick={() => toggleAuthorization(participant, "compile")} 
        isButtonOn={isCompilePossible}
      >
        컴파
      </CustomButton>
      <CustomButton 
        onClick={() => toggleAuthorization(participant, "draw")} 
        isButtonOn={isDrawPossible}
      >
        그림
      </CustomButton>
      <CustomButton 
        onClick={() => toggleAuthorization(participant, "mic")} 
        isButtonOn={isMicPossible}
      >
        음성
      </CustomButton>
    </div>
  );
}

export default UserListItem;