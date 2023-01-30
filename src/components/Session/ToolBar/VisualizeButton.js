import { useDispatch, useSelector } from "react-redux";
import { onClickVisualizeButton } from "../../../store/toolBarActionSlice";
import { onVisualizeSubmit } from "../../../store/visualizeSlice";
import { onCompileSubmit } from "../../../store/compileSlice";
import { CustomButton } from "./ToolBar";


function VisualizeButton(props) {
  const dispatch = useDispatch();
  const isVisualizeButtonOn = useSelector((state) => state.toolBarAction.isVisualizeButtonOn);
  const isVisualizeSubmit = useSelector((state) => state.visualize.isVisualizeSubmit);
  const isCompileSubmit = useSelector((state) => state.compile.isCompileSubmit);

  function handleOnClick() {
    if (isVisualizeButtonOn) {
      dispatch(onClickVisualizeButton());
      if (isVisualizeSubmit) {
        dispatch(onVisualizeSubmit());
      }
      if (isCompileSubmit) {
        dispatch(onCompileSubmit());
      }
    } else {
      dispatch(onClickVisualizeButton());
    }
  }

  return (
    <CustomButton 
      onClick={handleOnClick}
      on={isVisualizeButtonOn}
    >
      시각
    </CustomButton>
  );
}

export default VisualizeButton;