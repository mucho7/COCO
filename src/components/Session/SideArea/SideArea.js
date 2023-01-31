import styled from "styled-components";

import { useSelector } from "react-redux";

import CompileArea from "./CompileArea";
import ChatArea from "./ChatArea";


const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

function SideArea(props) {
  const isCompileButtonOn = useSelector((state) => state.toolBarAction.isCompileButtonOn);

  return (
    <Box>
      {isCompileButtonOn && <CompileArea />}
      <ChatArea />
    </Box>
  );
}

export default SideArea;