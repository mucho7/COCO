import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Ide from "./Ide";
import MyDrawLayer from "./MyDrawLayer";
import OthersDrawLayer from "./OthersDrawLayer";
import { participantsInstances, setUpdated } from "../../../store/sessionSlice";


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
  const [participants, setParticipants] = useState({});
  const updated = useSelector((state) => state.session.updated);
  const dispatch = useDispatch();
  const [layers, setLayers] = useState({});

  useEffect(() => {
    if (participantsId) {
      setParticipants(participantsInstances.get(participantsId));
    }
    
    if (updated) {
      setParticipants(participantsInstances.get(participantsId));
      dispatch(setUpdated(false));
      Object.keys(participants)?.forEach((userName) => {
        if (!layers[userName]) {
          const newLayer = <OthersDrawLayer participant={participants[userName]} />
          const updatedLayers = layers;
          updatedLayers[userName] = newLayer;
          setLayers(updatedLayers);
        }
      })
      Object.keys(layers)?.forEach((userName) => {
        if (!Object.keys(participants)?.includes(userName)) {
          const updatedLayers = layers;
          delete updatedLayers.userName;
          setLayers(updatedLayers);
        }
      })
    }
  }, [participantsId, updated, dispatch, participants, layers])

  return (
    <IdeAreaDiv id="ideArea">
      {isDrawButtonOn && <MyDrawLayer />}
      {
        participantsId !== null && 
        Object.values(layers)?.map((layer) => {
            return layer
          }
        )
      }
      {participantsId !== null && <Ide />}
    </IdeAreaDiv>
  );
}

export default IdeArea;