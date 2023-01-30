import styled from "styled-components";

import { useSelector } from "react-redux";

const CompileResultDiv = styled.div`

`

function CompileResult() {
  const isCompileSubmit = useSelector((state) => state.compile.isCompileSubmit);
  const testInput = useSelector((state) => state.compile.testInput);
  const visualizationDto = useSelector((state) => state.compile.visualizationDto);

  const resultDiv = (
    <div>
      <p>예제 입력: {testInput}</p>
      <p>변수명: {visualizationDto?.variable}</p>
      <p>라인: {visualizationDto?.line}</p>
      <p>반복 변수: {visualizationDto?.iterationVariableVector}</p>
    </div>
  )
  
  return (
    <CompileResultDiv>
      {isCompileSubmit && resultDiv}
    </CompileResultDiv>
  );
}

export default CompileResult;