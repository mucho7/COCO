import styled from "styled-components";


const IdeAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #14213D;
  color: white;
`;


function IdeArea(props) {
  return (
    <IdeAreaDiv>
      <h1>IDE Area</h1>
    </IdeAreaDiv>
  );
}

export default IdeArea;