import styled from "styled-components";

import { useDispatch } from "react-redux";
import { onClickVisualizeButton } from "../../../../store/visualizeSlice";

const VisualizationFormDiv = styled.div`

`



function VisualizationForm() {
  const dispatch = useDispatch();

  function handleSubmitVisualize(event) {
    event.preventDefault();
    dispatch(onClickVisualizeButton());
  }

  return (
    <VisualizationFormDiv>
      변수 시각화
      <form onSubmit={handleSubmitVisualize}>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <br />
        <button>Visualize</button>
      </form>
    </VisualizationFormDiv>
  );
}

export default VisualizationForm;