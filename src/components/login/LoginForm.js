import { useEffect, useState, useRef }  from 'react'
import { Box, Container, Grid, Button, TextField } from '@mui/material'

function LoginForm () {
    const [inputID, setInputID ] = useState()
    const [inputPassword, setInputPassword] = useState()
    
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    })

    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'outlined-id':
                setInputID(e.target.value)
                break
            case 'outlined-password':
                setInputPassword(e.target.value)
                break
            default:
                // nothing
        }
    }

    const temp_user_info = {
        user_id: inputID, 
        password: inputPassword,
    }

    async function axios_test() {

        const response = await fetch('https://70.12.247.183:8080/login', {
            method: 'POST',
            body: temp_user_info,
            headers: {
                "Content-Type": `application/json`,
            }
        })
        const data = await response.json()
        // 영구 저장 및 리덕스를 활용한 전역변수 저장이 필요함
        console.log('들어옴', data)
    }   

    const onClickHandler = () => {
        axios_test()
    }

    return (
        <Container fixed>
            <h2>로그인</h2><hr/>
            <Box component="form">
                <Grid container spacing={2} style={{padding: '2rem', justifyContent: 'center'}}>
                    {/* map을 활용한 반복문으로 고쳤으면 함 */}
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} ref={inputRef} id="outlined" label="ID" fullWidth />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} id="outlined-password" label="Password" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={onClickHandler} variant="contained" className="submit" style={{height: '3rem'}} fullWidth> <b>로그인</b></Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )   
}

export default LoginForm