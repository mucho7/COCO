import styled from "styled-components";


const CompileAreaTitleBarDiv = styled.div`
  height: 35px;
  background-color: #14213D;
  color: white;
`

function CompileAreaTitleBar() {
  return (
    <CompileAreaTitleBarDiv>
      <p>Compile</p>
    </CompileAreaTitleBarDiv>
  )
}

export default CompileAreaTitleBar;