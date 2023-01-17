import { useState } from 'react'
import { Grid, Box, Container, Button, TextField } from '@mui/material'


function SigninForm() {
    const [emailValidation, setEmailValidation] = useState(false)

    const onClickHandler = (e) => {
        if (emailValidation === true) {
            setEmailValidation(false)
        } else {
            setEmailValidation(true)
        }
    }

    return (
        <Container fixed>
            <h2>회원 가입</h2><hr/>
            <Box component="form">
                <Grid container spacing={2} style={{padding: '2rem', justifyContent: 'center'}}>
                    <Grid item xs={8}>
                        <TextField id="outlined" label="ID"  fullWidth/>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="outlined-password" type="password" label="Password" fullWidth/>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="outlined-password-check" type="password" label="Password Check" fullWidth/>
                        {/* <TextField error id="outlined-password-check" type="password" label="Password Check" helperText="비밀번호 불일치" fullWidth/> */}
                    </Grid>
                    <Grid item xs={8}>
                        <TextField error={emailValidation} id="outlined-email" label="E-Mail" fullWidth/>
                        {/* <TextField error 
                        inputRef={emailRef => emailRef && emailRef.focus()}  
                        id="outlined-email" label="E-Mail" 
                        helperText="이메일 아니다"  fullWidth/> */}
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={onClickHandler} variant="contained" className="submit" fullWidth style={{height:"3rem"}}> <b>회원가입</b></Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}



export default SigninForm