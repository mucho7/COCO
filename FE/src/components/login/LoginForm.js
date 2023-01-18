import { useEffect, useRef }  from 'react'
import { Box, Container, Grid, Button, TextField } from '@mui/material'

function LoginForm () {

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })
    return (
        <Container fixed>
            <h2>로그인</h2><hr/>
            <Box component="form">
                <Grid container spacing={2} style={{padding: '2rem', justifyContent: 'center'}}>
                    <Grid item xs={7}>
                        <TextField ref={inputRef} id="outlined" label="ID" fullWidth />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField id="outlined-password" label="Password" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" className="submit" style={{height: '3rem'}} fullWidth> <b>로그인</b></Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )   
}

export default LoginForm