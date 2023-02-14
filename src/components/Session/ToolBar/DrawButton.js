import { useSelector, useDispatch } from "react-redux";
import { onClickDrawButton } from "../../../store/toolBarActionSlice";

import IconButton from '@mui/material/IconButton';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';


function DrawButton(props) {
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
  const isDrawPossible = useSelector((state) => state.session.isDrawPossible);
  const dispatch = useDispatch();
  
  return (
    <IconButton 
      onClick={() => {
        dispatch(onClickDrawButton());
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