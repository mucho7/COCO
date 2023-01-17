import { useEffect, useRef }  from 'react'
import { Box, Container, Grid, Button, TextField } from '@mui/material'


function SigninForm() {
    const focusRef = useRef()
    const inputList = {
        ID: {size: 8, id: "outlined-id", label: "ID", focus: false, fullWidth: true},
        Password: {size: 8, id: "outlined-password", label: "Password", focus: false, fullWidth: true},
        PasswordCheck: {size: 8, id: "outlined-password-check", label: "Password Check", focus: false, fullWidth: true},
        SubmitButton: {size: 8, id: "contained-button", label: "submit-button", focus: false, fullWidth: true},
    }

    useEffect(() => {
        focusRef.current.focus()
    })

    return (
        <Container fixed>
            <Box component="form">
                <Grid container spacing={2} style={{padding: '2rem', justifyContent: 'center'}}>
                    <Grid item xs={8}>
                        <TextField inputRef={focusRef} id="outlined" label="ID"  fullWidth/>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="outlined-password" type="password" label="Password" fullWidth/>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField error id="outlined-password-check" type="password" label="Password Check" helperText="비밀번호 불일치" fullWidth/>
                    </Grid>
                    <Grid item xs={8}>
                        {/* <TextField id="outlined-email" label="E-Mail" fullWidth/> */}
                        <TextField error id="outlined-email" label="E-Mail" helperText="이메일 아니다"  fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" className="submit" fullWidth style={{height:"3rem"}}> 회원가입 </Button>
                    </Grid>
                    
                </Grid>
            </Box>
        </Container>
    )
}



export default SigninForm