import styled  from 'styled-components'
import { useState } from 'react'
import { Button } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { ProfileUserInfoItem, ProfileUserInfoForm, ProfileUserTrophy, ProfilePasswordUpdateButton } from '../components/profile'
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function ProfilePage(params) {
    const [updateFlag, setUpdateFlag] = useState(false)

    // Axios로 교체될 정보
    const userInfo = [
        {name: 'User ID', content: 'SSAFY_Gorilla'},
        {name: 'User Name', content: '채치수'},
        {name: 'User E-Mail', content: 'SSAFY@edu.ssafy.com'},
        {name: 'Since', content: '23.01.01'},
    ]

    async function deleteUser() {
        console.log('들어간다')
        
        // user_id의 입출력에 관한 코드 정리가 필요함
        const response = await fetch(`/member/delete/${params.user_id}`, {
            method: 'PUT',
            body: JSON.stringify(),
            headers: {
                "Content-Type": `application/json`,
            }
        })
        const data = await response.json()
        console.log('들어옴', data)
    } 

    const flagClickHandler = () => {
        updateFlag ? setUpdateFlag(false) : setUpdateFlag(true)
    }

    const deleteUserHandler = () => {
        deleteUser()
    }

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
                    <Button onClick={deleteUserHandler} variant="contained" className="submit" fullWidth style={{ width: "7rem", height:"2.8rem", marginRight: "15px", backgroundColor: "red"}}><b>계정 삭제</b></Button>
                    <ProfilePasswordUpdateButton/>
                    <Button onClick={flagClickHandler} variant="contained" className="submit" fullWidth style={{ width: "7rem", height:"2.8rem", marginRight: "15px"}}><b>편집 완료</b></Button>
                </>}
            </PaddingBox>
            <TestingBox>
                <LeftBox>
                    <ProfileUserTrophy/>
                </LeftBox>
                <RightBox>
                    {updateFlag === false ? <ProfileUserInfoItem userInfo={userInfo}/> : <ProfileUserInfoForm userInfo={userInfo} />}
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