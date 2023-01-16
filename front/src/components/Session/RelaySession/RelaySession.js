import styled from "styled-components";

import IdeArea from "../IdeArea";
import SideArea from "../SideArea";
// import ToolBar from "../ToolBar";


const Box = styled.div`
  display: grid;
  grid-template-columns: 9fr 3fr;
  grid-template-rows: 9fr 1fr;
  width: 95vw;
  height: 95vh;
`;

function RelaySession(props) {
  return (
    <Box>
      <h1>dsfsdfe</h1>
      <IdeArea />
      <SideArea />
      {/* <ToolBar /> */}
    </Box>
  );
}

export default RelaySession;