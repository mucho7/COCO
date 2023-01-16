import styled from "styled-components";


const ParticipantsInfoBarDiv = styled.div`
  height: 45px;
  background-color: #14213D;
  color: white;
`

function ParticipantsInfoBar() {
  return (
    <ParticipantsInfoBarDiv>
      <p>참여자 수 정보</p>
    </ParticipantsInfoBarDiv>
  )
}

export default ParticipantsInfoBar;