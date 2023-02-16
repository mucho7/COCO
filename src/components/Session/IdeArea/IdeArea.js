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
  grid-row-start: 1;
  grid-row-end: 12;
  grid-column-start: 1;
  grid-column-end: 4;
`;


function IdeArea(props) {
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState(null);
  const updated = useSelector((state) => state.session.updated);
  const [layers, setLayers] = useState(null);

  useEffect(() => {
    setParticipants(participantsInstances.get(participantsId));
    
  }, [participantsId, updated])

  useEffect(() => {
    if (participants !== null && layers !== null) {
      const users = Object.keys(participants)
      const prevUsers = Object.keys(layers)
      console.log("users: ", users)
      console.log("prevUsers: ", prevUsers)
      console.log("participants: ", participants)
  
      // 레이어 추가
      users.forEach((user) => {
        // 아직 레이어가 생겨있지 않은 유저이면서 유저가 그림판 on 상태라면
        if (!prevUsers.includes(user) && participants[user]?.isDrawButtonOn) {
          const addedLayers = {...layers}
          addedLayers[user] = <OthersDrawLayer key={user} user={user} />
          setLayers(addedLayers)
        }
      })
  
      // 레이어 삭제
      prevUsers.forEach((user) => {
        // 나간 유저이거나 유저가 그림판 off상태라면
        if (!users.includes(user) || !participants[user]?.isDrawButtonOn) {
          const deletedLayers = {...layers};
          delete deletedLayers[user];
          setLayers(deletedLayers);
        }
      })
    }
  }, [participants])

  return (
    <IdeAreaDiv id="ideArea">
      {isDrawButtonOn && <MyDrawLayer />}
      {layers !== null && Object.values(layers)}
      {participantsId !== null && <Ide />}
    </IdeAreaDiv>
  );
}

export default IdeArea;