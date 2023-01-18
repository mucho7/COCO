import styled from "styled-components";

import { useDispatch } from "react-redux";
import { onCompileSubmit } from "../../../../store/compileSlice";


const CompileFormDiv = styled.div`

`

function CompileForm() {
  const dispatch = useDispatch();

  function handleSubmitCompile(event) {
    event.preventDefault();
    dispatch(onCompileSubmit());
  }

  return (
    <CompileFormDiv>
      컴파일
      <form onSubmit={handleSubmitCompile}>
        <input type="text" />
        <br />
        <button>Compile</button>
      </form>
    </CompileFormDiv>
  );
}

export default CompileForm;