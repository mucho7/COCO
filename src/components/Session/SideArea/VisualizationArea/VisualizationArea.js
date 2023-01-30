import styled from "styled-components";

import VisualizationAreaTitleBar from "./VisualizationAreaTitleBar";
import VisualizationForm from "./VisualizationForm";
import VisualizationResult from "./VisualizationResult";
import { useSelector } from "react-redux";


const VisualizationAreaDiv = styled.div`
  box-sizing: border-box;
  background-color: #4A4E69;
  display: flex;
  flex-direction: column;
  flex: 4;
  width: 100%;
`;


function VisualizationArea(props) {
  const isVisualizeSubmit = useSelector((state) => state.visualize.isVisualizeSubmit);
  const isVisualizeButtonOn = useSelector((state) => state.toolBarAction.isVisualizeButtonOn);

  return (
    <VisualizationAreaDiv>
      <VisualizationAreaTitleBar />
      {isVisualizeButtonOn && !isVisualizeSubmit && <VisualizationForm />}
      {isVisualizeSubmit && <VisualizationResult />}
    </VisualizationAreaDiv>
  );
}

export default VisualizationArea;