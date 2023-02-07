import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// import { deleteSession } from "../../store/sessionListSlice";
import { setSocketInfo } from "../../store/sessionSlice";
import { getSessionDetail } from "../../api/session";
import { useState } from "react";
import { useMemo } from "react";
import { deleteSession } from "../../api/session";

function SessionDetail() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const { roomId } = useParams();
  // const sessionList = useSelector((state) => state.sessionList.sessionList);
  // const session = sessionList.filter((session) => session.id === Number(roomId))[0];
  const sample = {
    roomId: "1",
    hostId: "A",
    title: "AAAAAAAAA",
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto officiis corrupti saepe, repellat consequuntur accusantium molestias laboriosam sequi ratione aliquid fuga. Dicta maiores eos ad tempora, tenetur eveniet labore praesentium.",
    mode: "study"
  }
  const [session, setSession] = useState(sample);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  function handleChangeUserName(event) {
    setUserName(event.target.value)
  }
  function handleChangeRoomName(event) {
    setRoomName(event.target.value)
  }

  // WebRTC 서버로 연결하는 동작으로 변경
  function enterSession() {
    switch (session.mode) {
      case "study":
        dispatch(setSocketInfo({userName, roomName}));
        navigate("/study");
        // const sessionWindow = window.open("http://localhost:3000/normal", "sessionWindow", "popup")
        // sessionWindow.resizeTo(1600, 900);
        break;
      case "relay":
        navigate("/relay");
        break;
      default:
    } 
  }

  // 백엔드의 /room/{room_id}로 delete 요청보내는 동작으로 변경
  async function handleDeleteSession() {
    // let idx
    // for (let i=0; i < sessionList.length; i++) {
    //   if (sessionList[i].id === Number(roomId)) {
    //     idx = i;
    //     break;
    //   }
    // }
    // dispatch(deleteSession(idx))
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
        <Stack spacing={2} direction="row" sx={{  display: "flex", justifyContent: "flex-end", mr: 2 }}>
          username: <input type="text" value={userName} onChange={handleChangeUserName} />
          roomname: <input type="text" value={roomName} onChange={handleChangeRoomName} />
          <Button variant="contained" onClick={enterSession}>참여</Button>
          <Button variant="contained">수정</Button>
          <Button variant="contained" onClick={handleDeleteSession}>삭제</Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default SessionDetail;