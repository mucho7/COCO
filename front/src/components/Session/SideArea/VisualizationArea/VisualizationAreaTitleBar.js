import styled from "styled-components";


const VisualizationTitleBarDiv = styled.div`
  height: 35px;
  background-color: #14213D;
  color: white;
`

function VisualizationTitleBar() {
  return (
    <VisualizationTitleBarDiv>
      <p>Visualization</p>
    </VisualizationTitleBarDiv>
  )
}

export default VisualizationTitleBar;