import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

// import { createSession } from '../../store/sessionListSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { updateSession } from '../../api/session';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';


function UpdateSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ cookie ] = useCookies(["userInfo"]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputMode, setInputMode] = useState("");
  const [inputMax, setInputMax] = useState(0);

  const updatedSessionInfo = {
    hostId: window.localStorage.getItem("userId"),
    title: inputTitle,
    content: inputContent,
    hostRating: 10,
    mode: inputMode,
    max: inputMax,
    tokenL: {
      jwt_token: cookie.userInfo,
      refresh_token: cookie.userInfo
    }
  }

  // 기존 세션 내용 가져오기
  const session = location.state;

  useEffect(() => {
    setInputTitle(session.title)
    setInputContent(session.content)
    setInputMode(session.mode)
    setInputMax(session.max)
  }, [session])

  // 입력값 변경 이벤트
  const onTypingHandler = (e) => {
    switch (e.target.id) {
        case "title":
            setInputTitle(e.target.value)
            break
        case "content":
            setInputContent(e.target.value)
            break
        case "mode":
            setInputMode(e.target.value)
            break
        case "max":
          setInputMax(e.target.value)
          break;
        default:
            // nothing
    }
}

  async function handleUpdateSession(event) {
    event.preventDefault();
    await updateSession(
      session.roomId, updatedSessionInfo,
      (data) => {
        console.log(data)
        navigate(`/room/${session.roomId}`);
      },
      (err) => console.log(err)
    )
  }
  
  
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        세션 생성
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleUpdateSession}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="hostId"
              label="HOST ID"
              value={updateSession.hostId}
              autoComplete="hostId"
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="세션 제목"
              value={inputTitle}
              onChange={onTypingHandler}
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="content"
              label="세션 설명"
              value={inputContent}
              onChange={onTypingHandler}
              multiline
              rows={6}
              autoComplete="content"
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel id="mode">모드</FormLabel>
            <RadioGroup name="mode" row value={inputMode} onChange={onTypingHandler}>
              <FormControlLabel value="study" control={<Radio />} label="study" />
              <FormControlLabel value="relay" control={<Radio />} label="relay" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="max"
              label="최대 참여자 수"
              value={inputMax}
              onChange={onTypingHandler}
              type="number"
              autoComplete="max"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          수정 완료
        </Button>
        <Link to={`/room/${session.roomId}`} style={{textDecoration: "none"}}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            취소
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default UpdateSession;
