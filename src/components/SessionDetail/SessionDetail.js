import { Container, Box, Stack, Button } from '@mui/material';

import { useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { getSessionDetail } from "../../api/session";
import { useState } from "react";
import { useMemo } from "react";
import { deleteSession, enterSession } from "../../api/session";


function SessionDetail() {
  const navigate = useNavigate();
  
  // 세션 정보 가져오기
  const { roomId } = useParams();
  const sample = {
    roomId: "1",
    hostId: "A",
    title: "AAAAAAAAA",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto officiis corrupti saepe, repellat consequuntur accusantium molestias laboriosam sequi ratione aliquid fuga. Dicta maiores eos ad tempora, tenetur eveniet labore praesentium.",
    mode: "study"
  }
  const [session, setSession] = useState(sample);
  
  useMemo(() => {
    const enterSessionDetail = async () => {
      await getSessionDetail(
        roomId,
        (data) => {return data.data},
        (err) => {
          console.log(err);
          alert("해당 세션이 종료, 삭제되었거나 존재하지 않는 세션입니다.")
          navigate("/session")
        }
        ).then((data) => {
          setSession(data);
        })
      }
      enterSessionDetail();
    }, [navigate, roomId])

  // 세션 참여
  async function handleEnterSession() {
    await enterSession(
      roomId, localStorage.getItem("userId"),
      (data) => {
        console.log(data)
        switch (session.mode) {
          case "study":
            navigate(`/session/${roomId}/study`)
            // window.open(`https://${window.location.host}/session/${roomId}/study`);
            // sessionWindow.resizeTo(1600, 900);
            break;
          case "relay":
            // navigate(`/room/${roomId}/relay`)
            break;
          default:
        }
      },
      (err) => {
        console.log(err)
        switch (err.response.status) {
          case 404:
            alert("해당 세션이 종료, 삭제되었거나 존재하지 않는 방입니다.")
            navigate("/session")
            break;
          case 500:
            alert(err.response.data.message)
            break;
          default:
        }
      }
    )
  }

  // 세션 삭제
  async function handleDeleteSession() {
    await deleteSession(
      roomId,
      (data) => {
        console.log(data);
        navigate("/session");
      },
      (err) => console.log(err)
    )
  }

  return (
    <Container>
      <Box sx={{ px: 2, py: 3, display: "flex", flexDirection: "column", bgcolor: '#E5E5E5', height: '100vh' }}>
        <Box sx={{ flexGrow: 1 }}>
          <h1>세션: { session.title }</h1>
          <p>호스트: { session.hostId }</p>
          <p>모드: { session.mode }</p>
          <p>시작 시간: </p>
          <hr />
          <p>{ session.content }</p>
        </Box>
        <Stack spacing={2} direction="row" sx={{  display: "flex", justifyContent: "flex-end", mr: 2 }}>
          <Link to={"/session"} style={{textDecoration: "none"}}>
            <Button variant="contained">뒤로</Button>
          </Link>
          <Button variant="contained" onClick={handleEnterSession}>참여</Button>
          {/* 작성자 여부에 따라 수정, 삭제 버튼 표시  */}
          {
            (session.hostId === localStorage.getItem("userId")) && 
            <Link to={`/session/${roomId}/update`} state={session} style={{textDecoration: "none"}} session={session}>
              <Button variant="contained">수정</Button>
            </Link>
          }
          {
            (session.hostId === localStorage.getItem("userId")) &&
            <Button variant="contained" onClick={handleDeleteSession}>삭제</Button>
          }
        </Stack>
      </Box>
    </Container>
  );
}

export default SessionDetail;