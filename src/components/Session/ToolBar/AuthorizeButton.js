import { CustomButton } from "./ToolBar";
import { useSelector, useDispatch } from "react-redux";
import { onClickAuthorizeButton } from "../../../store/toolBarActionSlice";


function AuthorizeButton(props) {
  const isAuthorizeButtonOn = useSelector((state) => state.toolBarAction.isAuthorizeButtonOn);
  const dispatch = useDispatch();

  return (
    <CustomButton 
      onClick={() => {dispatch(onClickAuthorizeButton());}} 
      isButtonOn={isAuthorizeButtonOn}
    >
      권한
    </CustomButton>
  );
}

export default AuthorizeButton;