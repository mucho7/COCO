import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { deleteSession } from "../../store/sessionListSlice";

function SessionDetail() {
  const { roomId } = useParams();
  const sessionList = useSelector((state) => state.sessionList.sessionList);
  const session = sessionList.filter((session) => session.id === Number(roomId))[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // WebRTC 서버로 연결하는 동작으로 변경
  function enterSession() {
    switch (session.mode) {
      case "normal":
        // navigate("/normal");
        const sessionWindow = window.open("http://localhost:3000/normal", "sessionWindow", "popup")
        sessionWindow.resizeTo(1600, 900);
        break;
      case "relay":
        navigate("/relay");
        break;
      default:
    } 
  }

  // 백엔드의 /room/{room_id}로 delete 요청보내는 동작으로 변경
  function handleDeleteSession() {
    let idx
    for (let i=0; i < sessionList.length; i++) {
      if (sessionList[i].id === Number(roomId)) {
        idx = i;
        break;
      }
    }
    dispatch(deleteSession(idx))
    navigate("/room");
  }

  return (
    <Container>
      <Box sx={{ px: 2, py: 3, display: "flex", flexDirection: "column", bgcolor: '#E5E5E5', height: '100vh' }}>
        <Box sx={{ flexGrow: 1 }}>
          <h1>세션: { session.title }</h1>
          <p>호스트: </p>
          <p>모드: { session.mode }</p>
          <p>시작 시간: </p>
          <hr />
          <p>{ session.content }</p>
        </Box>
        <Stack spacing={2} direction="row" sx={{  display: "flex", justifyContent: "flex-end", mr: 2 }}>
          <Button variant="contained" onClick={enterSession}>참여</Button>
          <Button variant="contained">수정</Button>
          <Button variant="contained" onClick={handleDeleteSession}>삭제</Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default SessionDetail;