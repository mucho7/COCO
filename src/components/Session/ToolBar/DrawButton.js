import { useSelector, useDispatch } from "react-redux";
import { onClickDrawButton } from "../../../store/toolBarActionSlice";
import { websocketInstances } from "../../../store/sessionSlice";

import IconButton from '@mui/material/IconButton';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';


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
    <IconButton 
      onClick={() => {
        dispatch(onClickDrawButton());
        toggleAuthorization();
      }} 
      disabled={!isDrawPossible}
      sx={{ 
        width: "50px", 
        height: "50px", 
        m: '5px', 
        p: '2px',
        bgcolor: isDrawButtonOn ? "#FCA311" : "#E5E5E5" 
      }}
    >
      <PaletteOutlinedIcon fontSize="large" />
    </IconButton>
  );
}

export default DrawButton;