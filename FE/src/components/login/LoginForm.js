import { useEffect, useRef }  from 'react'
import { Box, Container, Grid, Button, TextField } from '@mui/material'

function LoginForm () {

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })
    return (
        <Container fixed>
            <Box component="form">
                <Grid container spacing={2} style={{padding: '2rem'}}>
                    <Grid item xs={12}>
                        <TextField ref={inputRef} id="outlined" label="ID"  style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-password" label="Password" style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" className="submit" style={{width: '100%'}}> 로그인 </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )   
}

export default LoginForm