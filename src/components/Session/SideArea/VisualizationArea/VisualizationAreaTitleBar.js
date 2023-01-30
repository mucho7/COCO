import styled from "styled-components";


const VisualizationAreaTitleBarDiv = styled.div`
  height: 35px;
  background-color: #14213D;
  color: white;
`

function VisualizationAreaTitleBar() {
  return (
    <VisualizationAreaTitleBarDiv>
      <p>Visualize</p>
    </VisualizationAreaTitleBarDiv>
  )
}

export default VisualizationAreaTitleBar;