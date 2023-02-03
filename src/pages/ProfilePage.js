import styled  from 'styled-components'
import { useState, useEffect,  } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie'

import  { Navbar } from '../components/navbar';
// import { onEnterProfile,  } from "../store/userInfoUpdateSlice"
import { deleteUserInfo, readUserInfo } from "../api/member"

import { Button } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

import SidePaddingBox from './SidePaddingBox'

import { ProfileUserInfoItem, ProfileUserInfoForm, ProfileUserTrophy, ProfilePasswordUpdateButton } from '../components/profile'


function ProfilePage(params) {
    const navigate = useNavigate()
    const [ userInfo, setUesrInfo ] = useState([])
    const [ cookie, removeCookie ] = useCookies(["userInfo"])
    const [ updateFlag, setUpdateFlag ] = useState(false)
    
    async function deleteUser() {       
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
        const objectToArray = (obj) => {
            const keys = Object.keys(obj);
            return keys.map((key) => [key, obj[key]]);
        };
        
        const filterObject = (obj, keys) => {
            const filteredArray = objectToArray(obj).filter((item) => 
                keys.includes(item[0])
            );
            return (filteredArray);
        };

        const readUser = async () => {
            await readUserInfo(
                {
                    userId: cookie.userInfo.user_id,
                    'Authorization': cookie.userInfo.jwt_token,
                    'refreshToken':  cookie.userInfo.refresh_token,
                },
                (data) => {return data.data},
                (err) => {console.log(err)}
        ).then(data => {
            setUesrInfo(filterObject(data, ['id', 'name', 'email', 'regTime']))
        })}
        readUser()
    }, [cookie])

    console.log(userInfo)

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
                    {updateFlag === false ? <ProfileUserInfoItem userInfo={(userInfo)}/> : <ProfileUserInfoForm userInfo={userInfo} />}
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