import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { onClickDrawButton } from "../../../store/toolBarActionSlice";


function DrawButton(props) {
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
  const isDrawPossible = useSelector((state) => state.toolBarAction.isDrawPossible);

  const dispatch = useDispatch();

  return (
    <CustomButton 
      onClick={() => {
        dispatch(onClickDrawButton());
        // if (!isDrawButtonOn) {
        //   const message = {
        //     id: "sendImageData",
        //     userName: userName,
        //     imageData: {}
        //   }
        //   ws.send(JSON.stringify(message));
        // }
      }} 
      isButtonOn={isDrawButtonOn}
      disabled={!isDrawPossible}
    >
      그림
    </CustomButton>
  );
}

export default DrawButton;