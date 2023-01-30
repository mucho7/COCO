import { Container, Box, } from '@mui/material';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function SessionList() {
  const sessionList = useSelector((state) => state.sessionList.sessionList);
  const navigate = useNavigate();

  function goToDetail(id) {
    navigate(`/room/${id}`);
  }

  return (
    <Container>
      <Box sx={{ px: 2, py: 3, display: "flex", flexDirection: "column", bgcolor: '#E5E5E5', height: '100vh' }}>
        <Box>상태표시줄</Box>
        <hr />
        {sessionList.map((session) => {
          return (
            <Box key={session.id} onClick={() => goToDetail(session.id)}>
              {session.id} : {session.title}
            </Box>
          );
        })}
      </Box>
      <button onClick={() => {navigate("/room/create");}}>만들기</button>
    </Container>
  )
}

export default SessionList;