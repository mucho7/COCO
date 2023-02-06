import styled from "styled-components";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Ide from "./Ide";
import MyDrawLayer from "./MyDrawLayer";
import OthersDrawLayer from "./OthersDrawLayer";
import { participantsInstances } from "../../../store/sessionSlice";


const IdeAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #14213D;
  color: white;
  position: relative;
`;


function IdeArea(props) {
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
  // const imageData = useSelector((state) => state.session.)
  // const [participantsId, setParticipantsId] = useState(-1);
  const participantsId = useSelector((state) => state.session.participantsId);
  const participants = participantsInstances.get(participantsId);
  console.log("participantId: ", participantsId)
  console.log("participants: ", participants);
  console.log(participantsInstances)
  console.log(participantsInstances.get(participantsId))

  useEffect(() => {
    
    // setParticipants(participantsInstances.get(participantsId));
  }, [participantsId])

  return (
    <IdeAreaDiv>
      {isDrawButtonOn && <MyDrawLayer />}
      {
        participantsId !== null && 
        Object.values(participants).map((participant) => {
          return (
            <OthersDrawLayer userName={participant?.name} key={participant?.name} />
          )
        })
      }
      <Ide />
    </IdeAreaDiv>
  );
}

export default IdeArea;