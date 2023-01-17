import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function CreateSession(params) {
  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Session Title"
              name="title"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="content"
              label="content"
              id="content"
              autoComplete="content"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="mode"
              label="mode"
              id="mode"
              autoComplete="mode"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="type"
              label="type"
              id="type"
              autoComplete="type"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </Container>
  )
}

export default CreateSession;
