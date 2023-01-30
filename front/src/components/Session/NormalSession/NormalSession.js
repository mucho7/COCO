import { useEffect } from "react";
import styled from "styled-components";

import IdeArea from "../IdeArea";
import SideArea from "../SideArea";
import ToolBar from "../ToolBar";


const NormalSessionDiv = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-template-rows: 11fr 1fr;
  width: 100vw;
  height: 100vh;
`;

function NormalSession(props) {
  useEffect(() => {
    window.addEventListener("resize", () => {
      window.resizeTo(1600, 900)
    });
  }, [])
  
  return (
    <NormalSessionDiv>
      <IdeArea />
      <SideArea />
      <ToolBar />
    </NormalSessionDiv>
  );
}

export default NormalSession;