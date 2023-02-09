import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { participantsInstances, websocketInstances } from "../../../store/sessionSlice";

const Button = styled.button`
  border: 1px solid #FCA311;
  background-color: #FCA311;
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

function QuitButton(props) {
  const navigate = useNavigate();
  const websoketId = useSelector((state) => state.session.websoketId);
  const [ws, setWs] = useState(websocketInstances.get(websoketId));

  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState(participantsInstances.get(participantsId));
  
  const userName = useSelector((state) => state.session.userName);
  
  useEffect(() => {
    setWs(websocketInstances.get(websoketId));
    setParticipants(participantsInstances.get(participantsId));
  }, [websoketId, participantsId])

  function onClickQuitButton() {
    if (ws) {
      ws.close();
    }
    if (participants) {
      participants[userName].dispose();
    }
    navigate("/room")
  }
  
  return (
    <Button onClick={onClickQuitButton}>
      종료
    </Button>
  );
}

export default QuitButton;