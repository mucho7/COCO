import { useSelector } from "react-redux";
import styled from "styled-components";


const ParticipantsInfoBarDiv = styled.div`
  flex: 1;
  background-color: #14213D;
  color: white;
`

function ParticipantsInfoBar() {
  const countUsers = useSelector((state) => state.session.countUsers);

  return (
    <ParticipantsInfoBarDiv>
      <p>현재 인원 수: { countUsers }</p>
    </ParticipantsInfoBarDiv>
  )
}

export default ParticipantsInfoBar;