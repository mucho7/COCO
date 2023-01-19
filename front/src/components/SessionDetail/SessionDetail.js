import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function SessionDetail() {
  const { sessionId } = useParams();
  const sessionList = useSelector((state) => state.sessionList.sessionList);
  const session = sessionList.filter((session) => session.id === Number(sessionId))[0];
  const navigate = useNavigate();

  function enterSession() {
    switch (session.mode) {
      case "normal":
        navigate("/normal");
        break;
      case "relay":
        navigate("/relay");
        break;
      default:
    } 
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
          <Button variant="contained">삭제</Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default SessionDetail;