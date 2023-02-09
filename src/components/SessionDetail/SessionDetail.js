import { Container, Box, Stack, Button } from '@mui/material';

import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

// import { deleteSession } from "../../store/sessionListSlice";
import { setSocketInfo } from "../../store/sessionSlice";
import { getSessionDetail } from "../../api/session";
import { useState } from "react";
import { useMemo } from "react";
import { deleteSession, enterSession } from "../../api/session";
// import { useCookies } from "react-cookie";

function SessionDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();
  // const [ cookie ] = useCookies(["userInfo"]);
  // const userId = window.localStorage.getItem("userId")
  
  
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
        (err) => console.log(err)
        ).then((data) => {
          setSession(data);
        })
      }
      enterSessionDetail();
    }, [roomId])
    
  // 회원 기능 연결 없이 임시로 username roomname 정하는 코드
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  function handleChangeUserName(event) {
    setUserName(event.target.value)
  }
  function handleChangeRoomName(event) {
    setRoomName(event.target.value)
  }

  // 세션 참여
  async function handleEnterSession() {
    await enterSession(
      roomId, userName,
      (data) => {
        console.log(data)
        dispatch(setSocketInfo({userName: userName, roomName: roomId}))
        switch (session.mode) {
          case "study":
            navigate(`/room/${roomId}/study`)
            // const sessionWindow = window.open("http://localhost:3000/normal", "sessionWindow", "popup")
            // sessionWindow.resizeTo(1600, 900);
            break;
          case "relay":
            // navigate(`/room/${roomId}/relay`)
            break;
          default:
        }
      },
      (err) => {
        // console.log(err)
        switch (err.response.status) {
          case 404:
            alert("해당 세션이 종료, 삭제되었거나 존재하지 않는 방입니다.")
            navigate("/room")
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
        navigate("/room");
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
        <Stack spacing={2} direction="row" sx={{  display: "flex", justifyContent: "flex-end", mr: 2, mb: 2 }}>
          username: <input type="text" value={userName} onChange={handleChangeUserName} />
          roomname: <input type="text" value={roomName} onChange={handleChangeRoomName} />
        </Stack>
        <Stack spacing={2} direction="row" sx={{  display: "flex", justifyContent: "flex-end", mr: 2 }}>
          <Link to={"/room"} style={{textDecoration: "none"}}>
            <Button variant="contained">뒤로</Button>
          </Link>
          <Button variant="contained" onClick={handleEnterSession}>참여</Button>
          {/* 작성자 여부 검사 {session.hostId === userId && } */}
          <Link to={`/room/${roomId}/update`} state={session} style={{textDecoration: "none"}} session={session}>
            <Button variant="contained">수정</Button>
          </Link>
          <Button variant="contained" onClick={handleDeleteSession}>삭제</Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default SessionDetail;