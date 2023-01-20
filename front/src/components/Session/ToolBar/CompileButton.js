import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { onClickCompileButton } from "../../../store/toolBarActionSlice";
import { onCompileSubmit } from "../../../store/compileSlice";


function CompileButton(props) {
  const dispatch = useDispatch();
  const isCompileButtonOn = useSelector((state) => state.toolBarAction.isCompileButtonOn);
  const isCompileSubmit = useSelector((state) => state.compile.isCompileSubmit);

  function handleOnClick() {
    if (isCompileButtonOn) {
      dispatch(onClickCompileButton());
      if (isCompileSubmit) {
        dispatch(onCompileSubmit());
      }
    } else {
      dispatch(onClickCompileButton());
    }
  }

  return (
    <CustomButton 
      onClick={handleOnClick} 
      on={isCompileButtonOn}
    >
      테케
    </CustomButton>
  );
}

export default CompileButton;