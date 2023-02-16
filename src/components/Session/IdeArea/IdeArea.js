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
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    if (participantsId) {
      setParticipants(participantsInstances.get(participantsId));
    }
    
    if (updated) {
      setParticipants(participantsInstances.get(participantsId));
      dispatch(setUpdated(false));
    }

    const participantsKeys = Object.keys(participants);

    setLayers((layers) => {
      return layers.filter((layer) => {
        return participantsKeys.includes(layer.props.id);
      });
    });

    participantsKeys.forEach((key) => {
      if (!layers.some((layer) => layer.props.id === key)) {
        setLayers((layers) => {
          return [
            ...layers,
            <OthersDrawLayer key={key} id={key} participant={participants[key]} />,
          ];
        });
      }
    });
  }, [participantsId, updated, dispatch, participants, layers])

  return (
    <IdeAreaDiv id="ideArea">
      {isDrawButtonOn && <MyDrawLayer />}
      {layers}
      {participantsId !== null && <Ide />}
    </IdeAreaDiv>
  );
}

export default IdeArea;