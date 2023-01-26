import { CustomButton } from "./ToolBar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onClickAuthorizationSettingButton } from "../../../store/authorizationSettingSlice";


function AuthorizationButton(props) {
  const [on, setOn] = useState(false)
  const dispatch = useDispatch();
  return (
    <CustomButton 
      onClick={() => {
        setOn(!on);
        dispatch(onClickAuthorizationSettingButton());
        }} 
      on={on}
    >
      권한
    </CustomButton>
  );
}

export default AuthorizationButton;