import styled from "styled-components";

import { useSelector } from "react-redux";

const CompileResultDiv = styled.div`

`

function CompileResult() {
  const isCompileSubmit = useSelector((state) => state.compile.isCompileSubmit);
  const result = useSelector((state) => state.compile.submitData);

  const resultDiv = (
    <div>
      <p>예제 입력: {result.testInput}</p>
      <p>시각화? {result.useVisualize}</p>
      <p>변수명: {result.variableName}</p>
      <p>라인: {result.selectLine}</p>
      <p>반복 변수: {result.iterationVariable}</p>
    </div>
  )
  
  return (
    <CompileResultDiv>
      {isCompileSubmit && resultDiv}
    </CompileResultDiv>
  );
}

export default CompileResult;