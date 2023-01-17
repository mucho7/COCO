import styled from "styled-components";

import TestCompileButton from "./TestCompileButton";
import VisualizeButton from "./VisualizeButton";
import DrawButton from "./DrawButton";
import MicButton from "./MicButton";
import AuthorizationButton from "./AuthorizationButton";
import ChatButton from "./ChatButton";
import QuitButton from "./QuitButton";
import AuthorizationSetting from "./AuthorizationSetting";

import { useSelector } from "react-redux";


const Box = styled.div`
  border: 2px solid #14213D;
  background-color: #4A4E69;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 3;
`;

const CustomButton = styled.button`
  border: 1px solid #FCA311;
  background-color: ${props => props.on ? '#FCA311' : '#E5E5E5'};
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

function ToolBar(props) {
  const isAuthorizationSettingOn = useSelector((state) => state.authorizationSetting.isAuthorizationSettingOn);
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

        {isAuthorizationSettingOn && <AuthorizationSetting />}
      </div>
    </Box>
  );
}

export default ToolBar;
export {CustomButton};