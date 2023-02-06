import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { onClickCompileButton } from "../../../store/toolBarActionSlice";
// import { onCompileSubmit } from "../../../store/compileSlice";


function CompileButton(props) {
  const isCompileButtonOn = useSelector((state) => state.toolBarAction.isCompileButtonOn);
  const isCompilePossible = useSelector((state) => state.toolBarAction.isCompilePossible);
  
  const dispatch = useDispatch();

  function handleOnClick() {
    if (isCompileButtonOn) {
      dispatch(onClickCompileButton());
    } else {
      dispatch(onClickCompileButton());
    }
  }

  return (
    <CustomButton 
      onClick={handleOnClick} 
      isButtonOn={isCompileButtonOn}
      disabled={!isCompilePossible}
    >
      컴파
    </CustomButton>
  );
}

export default CompileButton;