import styled  from 'styled-components'
import { Button } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { ProfileUserInfoItem, ProfileUserTrophy } from '../components/profile'

function ProfilePage(params) {

    // const userTrophy = [
    //     {name: },
    //     {},
    //     {},
    // ]

    const userInfo = [
        {name: 'User ID', content: 'SSAFY_Gorilla'},
        {name: 'User Name', content: '채치수'},
        {name: 'User E-Mail', content: 'SSAFY@edu.ssafy.com'},
        {name: 'Since', content: '23.01.01'},

    ]

    return (
        <div>
            <BackgroundBox>
                <BackgroundImg src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'/>
            </BackgroundBox>
            <AccountCircle sx={{ fontSize: '150px', color: '#FCA311', position: 'absolute', left: '100px', top: '140px', background: 'white', borderRadius: '100%' }}/>
            <PaddingBox>
                <Button variant="contained" className="submit" fullWidth style={{ width: "7rem", height:"3rem", marginRight: "15px"}}> <b>프로필 편집</b></Button>
            </PaddingBox>
            <TestingBox>
                <LeftBox>
                    <ProfileUserTrophy/>
                </LeftBox>
                <RightBox>
                    <ProfileUserInfoItem userInfo={userInfo}/>
                </RightBox>
            </TestingBox>
        </div>
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