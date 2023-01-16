import styled from "styled-components";

import VisualizationTitleBar from "./VisualizationAreaTitleBar";


const VisualizationAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #4A4E69;
  display: flex;
  flex-direction: column;
  flex: 4;
  width: 100%;
`;

function VisualizationArea(props) {
  return (
    <VisualizationAreaDiv>
      <VisualizationTitleBar />
      <h1>Visualization Area</h1>
    </VisualizationAreaDiv>
  );
}

export default VisualizationArea;