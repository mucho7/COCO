import styled from "styled-components";

import { useSelector } from "react-redux";

import Ide from "./Ide";
import DrawLayer from "./DrawLayer";


const IdeAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #14213D;
  color: white;
  position: relative;
`;


function IdeArea(props) {
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);


  return (
    <IdeAreaDiv>
      {isDrawButtonOn && <DrawLayer />}
      <Ide />
    </IdeAreaDiv>
  );
}

export default IdeArea;