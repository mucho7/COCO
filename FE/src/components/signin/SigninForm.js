import { useEffect, useRef }  from 'react'
import { Box, Container, Grid, Button, TextField } from '@mui/material'
import styled from '@emotion/styled'


function SigninForm(params) {
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
                        <TextField id="outlined-password" label="Password Check" style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <TextField ref={inputRef} id="outlined" label="E-Mail" style={{width: '100%'}}/> */}
                        <TextField error id="outlined" label="E-Mail" helperText="이메일 아니다"  style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" className="submit" style={{width: '100%'}}> 회원가입 </Button>
                    </Grid>
                    
                </Grid>
            </Box>
        </Container>
    )
}



export default SigninForm