import { useState }  from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { Box, Container, Grid, Button, TextField } from '@mui/material'
import { login } from "../../api/member"


// Login의 notNull을 처리할 코드가 필요
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

    // async function axios_test() {
    //     await fetch('http://i8a703.p.ssafy.io:8012/login', {
    //         method: 'POST',
    //         body: JSON.stringify(temp_user_info),
    //         headers: {
    //             "Content-Type": `application/json`,
    //         }
    //     })
    //     .then(result => {
    //         const headers = result.headers
    //         setCookie(
    //             'userInfo',
    //             {
    //                 user_id: temp_user_info.userId,
    //                 jwt_token: headers.get('Authorization'),
    //                 refresh_token: headers.get('refreshToken'),
    //             },
    //             {path: '/'}
    //         )
    //         console.log(cookie)
    //         navigate("/")
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         alert('다시 시도해주세요')
    //     })
    // }

    async function log_in() {
        await login(
        temp_user_info,
        (data) => {
            console.log(data)
            const headers = data.headers
            setCookie(
                'userInfo',
                {
                    user_id: temp_user_info.userId,
                    jwt_token: headers.get('Authorization'),
                    refresh_token: headers.get('refreshToken'),
                },
                {path: '/'}
            )
            console.log(cookie)
            navigate("/")
        },
        (error) => {
            console.log(error);
            alert(error.response.data)
        }
    )}

    const onClickHandler = (e) => {
        e.preventDefault()
        log_in()
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

export default LoginForm;