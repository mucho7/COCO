import styled from "styled-components";

import TestCompileButton from "./TestCompileButton";
import VisualizeButton from "./VisualizeButton";
import DrawButton from "./DrawButton";
import MicButton from "./MicButton";
import AuthorizationButton from "./AuthorizationButton";
import ChatButton from "./ChatButton";
import QuitButton from "./QuitButton";


const Box = styled.div`
  border: 2px solid #14213D;
  background-color: #4A4E69;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 3;
`;

function ToolBar(props) {
  return (
    <Box>
      <div>
        <TestCompileButton />
        <VisualizeButton />
        <DrawButton />
        <MicButton />
        <AuthorizationButton />
        <ChatButton />
        <QuitButton />
      </div>
    </Box>
  );
}

export default ToolBar;