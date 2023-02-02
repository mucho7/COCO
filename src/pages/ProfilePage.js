import styled  from 'styled-components'
import { useState, useEffect,  } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import  { Navbar } from '../components/navbar';
import {  } from "../store"
import { deleteUserInfo, readUserInfo } from "../api/member"

import { Button } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

import SidePaddingBox from './SidePaddingBox'

import { ProfileUserInfoItem, ProfileUserInfoForm, ProfileUserTrophy, ProfilePasswordUpdateButton } from '../components/profile'


function ProfilePage(params) {
    const navigate = useNavigate()
    const [ cookie, removeCookie ] = useCookies(['userInfo'])
    const [ updateFlag, setUpdateFlag ] = useState(false)

    // Axios로 교체될 정보
    const temp_userInfo = [
        {name: 'User ID', content: 'aas'},
        {name: 'User Name', content: '채치수'},
        {name: 'User E-Mail', content: 'SSAFY@edu.ssafy.com'},
        {name: 'Since', content: '23.01.01'},
    ]

    const userUpdatingInfo = [
        {name: 'User ID', content: 'SSAFY_Gorilla', updatable: false},
        {name: 'User Name', content: '채치수', updatable: true},
        {name: 'User E-Mail', content: 'SSAFY@edu.ssafy.com', updatable: true},
        {name: 'Since', content: '23.01.01', updatable: false},
    ]

    async function deleteUser() {       
        console.log(cookie) 
        await deleteUserInfo(
            {
                userId: cookie.userInfo.user_id,
                Authorization: cookie.userInfo.Authorization,
                refreshToken: cookie.userInfo.refreshToken,
            },
            (data) => {
                console.log(data)
                removeCookie()
                navigate('/')
            }
        )
    } 

    
    const flagClickHandler = () => {
        if (updateFlag) {
            setUpdateFlag(false)
        }  else setUpdateFlag(true)
    }

    
    useEffect(() => {
        const readUser = async () => {
            await readUserInfo(
                {
                    userId: cookie.userInfo.user_id,
                    'Authorization': cookie.userInfo.jwt_token,
                    'refreshToken':  cookie.userInfo.refresh_token,
                },
                (data) => {
                    console.log(data)
                    // 실제론 여기 있는 것처럼 보이지만 호출될 callback함수일 뿐임, 관련된 정보를 가져올 땐 redux를 활용한 전역변수 사용이 필요함
                }
                ,
                (err) => {
                    console.log(err)
                }
            )
        }
        readUser()
    })

    return (
        <SidePaddingBox>
            <Navbar />
            <BackgroundBox>
                <BackgroundImg src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'/>
            </BackgroundBox>
            <AccountCircle sx={{ fontSize: '150px', color: '#FCA311', position: 'absolute', left: '100px', top: '140px', background: 'white', borderRadius: '100%' }}/>
            <PaddingBox>
                {updateFlag === false 
                ? <Button onClick={flagClickHandler} variant="contained" className="submit" fullWidth style={{ width: "7rem", height:"2.8rem", marginRight: "15px"}}> <b>프로필 편집</b></Button>
                :<>
                    <Button onClick={deleteUser} variant="contained" className="submit" fullWidth style={{ width: "7rem", height:"2.8rem", marginRight: "15px", backgroundColor: "red"}}><b>계정 삭제</b></Button>
                    <ProfilePasswordUpdateButton/>
                    <Button onClick={flagClickHandler} variant="contained" className="submit" fullWidth style={{ width: "7rem", height:"2.8rem", marginRight: "15px"}}><b>편집 완료</b></Button>
                </>}
            </PaddingBox>
            <TestingBox>
                <LeftBox>
                    <ProfileUserTrophy/>
                </LeftBox>
                <RightBox>
                    {updateFlag === false ? <ProfileUserInfoItem userInfo={temp_userInfo}/> : <ProfileUserInfoForm userInfo={userUpdatingInfo} />}
                </RightBox>
            </TestingBox>
        </SidePaddingBox>
    )   
}

const BackgroundBox = styled.div`
    height: 150px;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    overflow: hidden;
`

const BackgroundImg = styled.img`
    width: 100%;    
    margin: -280px 0px 0px 0px;
`

const TestingBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 400px;
`
const LeftBox = styled.div`
    width: 50%;
    height: 400px;
    margin: 15px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const PaddingBox =  styled.div`
    width: 100%;    
    height: 90px;

    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
`

const RightBox = styled.div`
    width: 50%;
    height: 400px;
    margin: 15px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background-color: #e5e5e5;
`



export default ProfilePage