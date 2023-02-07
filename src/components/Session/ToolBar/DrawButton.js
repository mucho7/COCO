import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { onClickDrawButton } from "../../../store/toolBarActionSlice";
import { websocketInstances } from "../../../store/sessionSlice";


function DrawButton(props) {
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
  const isDrawPossible = useSelector((state) => state.session.isDrawPossible);

  const userName = useSelector((state) => state.session.userName);
  const websocketId = useSelector((state) => state.session.websocketId);
  const ws = websocketInstances.get(websocketId);
  const dispatch = useDispatch();


  function toggleAuthorization() {
    const message = {
      id: "toggleAuthorization",
      userName: userName,
      authorizationType: "drawButton"
    }

    ws.send(JSON.stringify(message));
  }
  

  return (
    <CustomButton 
      onClick={() => {
        dispatch(onClickDrawButton());
        toggleAuthorization();
      }} 
      isButtonOn={isDrawButtonOn}
      disabled={!isDrawPossible}
    >
      그림
    </CustomButton>
  );
}

export default DrawButton;