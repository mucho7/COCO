import { useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Box, Container, Grid, Button, TextField } from '@mui/material'

function LoginForm () {
    const navigate = useNavigate()
    const [ cookie, setCookie ] = useCookies(['userInfo'])
    const [ inputID, setInputID ] = useState()
    const [ inputPassword, setInputPassword ] = useState()

    const temp_user_info = {
        userId: inputID, 
        password: inputPassword,
    }

    const onTypingHandler = (e) => {
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

    async function axios_test() {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify(temp_user_info),
            headers: {
                "Content-Type": `application/json`,
            }
        })
        .then(result => {
            console.log(result.headers)
            setCookie(
                'userInfo',
                {
                    user_id: temp_user_info.userId,
                    jwt_token: result.data.Authorization,
                    refresh_token: result.data.refreshToken,
                },
                {path: '/'}
            )
            navigate("/")
        })
        .catch(error => {
            console.log(error)
            // check용 더미 token
            setCookie(
                'userInfo',
                {
                    user_id: temp_user_info.userId,
                    jwt_token: 1,
                    refresh_token: 1,
                },
                {path: '/'}
            )
            console.log(cookie)
            navigate('/')

            alert('다시 시도해주세요')
        })
        const result = await response.headers
        console.log(result)
    }

    const onClickHandler = (e) => {
        e.preventDefault()
        axios_test()
    }

    return (
        <Container fixed>
            <Box component="form">
                <Grid container spacing={2} style={{padding: '2rem', justifyContent: 'center'}}>
                    {/* map을 활용한 반복문으로 고쳤으면 함 */}
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} id="outlined-id" autoFocus label="ID" fullWidth />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField onChange={onTypingHandler} id="outlined-password" label="Password" type="password" fullWidth />
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