import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { onClickDrawButton } from "../../../store/toolBarActionSlice";


function DrawButton(props) {
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
  const dispatch = useDispatch();

  return (
    <CustomButton 
      onClick={() => {dispatch(onClickDrawButton());}} 
      on={isDrawButtonOn}
    >
      그림
    </CustomButton>
  );
}

export default DrawButton;