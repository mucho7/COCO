import styled from "styled-components";

import { useSelector } from "react-redux";

import VisualizationArea from "./VisualizationArea";
import CompileArea from "./CompileArea";
import ChatArea from "./ChatArea";


const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

function SideArea(props) {
  const isVisualizeButtonOn = useSelector((state) => state.toolBarAction.isVisualizeButtonOn);
  const isCompileButtonOn = useSelector((state) => state.toolBarAction.isCompileButtonOn);

  return (
    <Box>
      {isVisualizeButtonOn && <VisualizationArea />}
      {isCompileButtonOn && <CompileArea />}
      <ChatArea />
    </Box>
  );
}

export default SideArea;