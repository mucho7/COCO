import styled from "styled-components";

import CompileAreaTitleBar from "./CompileAreaTitleBar";
import CompileForm from "./CompileForm";
import CompileResult from "./CompileResult";
import { useSelector } from "react-redux";


const CompileAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #4A4E69;
  display: flex;
  flex-direction: column;
  flex: 4;
  width: 100%;
`;


function CompileArea(props) {
  const isCompileSubmit = useSelector((state) => state.compile.isCompileSubmit);
  const isCompileButtonOn = useSelector((state) => state.toolBarAction.isCompileButtonOn);

  return (
    <CompileAreaDiv>
      <CompileAreaTitleBar />
      {isCompileButtonOn && !isCompileSubmit && <CompileForm />}
      {isCompileSubmit && <CompileResult />}
    </CompileAreaDiv>
  );
}

export default CompileArea;