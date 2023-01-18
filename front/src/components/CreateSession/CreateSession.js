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

import { useDispatch } from 'react-redux';
import { sessionListActions } from '../../store/sessionListSlice';
import { useNavigate } from 'react-router-dom';


function CreateSession() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createSession = (event) => {
    event.preventDefault();
    const sessionData = new FormData(event.currentTarget);
    const payload = {
      title: sessionData.get('title'),
      content: sessionData.get('content'),
      mode: sessionData.get('mode')
    }
    dispatch(sessionListActions.createSession(payload));
    navigate("/sessionlist");
  }
  
  
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        세션 생성
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={createSession}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="세션 제목"
              name="title"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="content"
              label="세션 설명"
              id="content"
              multiline
              rows={6}
              autoComplete="content"
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel id="mode">모드</FormLabel>
            <RadioGroup name="mode" row>
              <FormControlLabel value="normal" control={<Radio />} label="normal" />
              <FormControlLabel value="relay" control={<Radio />} label="relay" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          생성
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {navigate("/sessionlist");}}
        >
          취소
        </Button>
      </Box>
    </Container>
  )
}

export default CreateSession;
