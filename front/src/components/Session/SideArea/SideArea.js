import styled from "styled-components";

import VisualizationArea from "./VisualizationArea";
import ChatArea from "./ChatArea";


const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

function SideArea(props) {
  return (
    <Box>
      <VisualizationArea />
      <ChatArea />
    </Box>
  );
}

export default SideArea;