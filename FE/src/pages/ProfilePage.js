import styled  from 'styled-components'
import { AccountCircle } from '@mui/icons-material'

function ProfilePage(params) {
    return (
        <div>
            <BackgroundBox>
                <BackgroundImg src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'/>
            </BackgroundBox>
            <AccountCircle sx={{ p: '36px', color: '#FCA311' }}/>
        </div>
    )
}

const BackgroundBox = styled.div`
    height: 200px;
    overflow: hidden;

`

const BackgroundImg = styled.img`
    width: 100%;
    margin: -186px 0px 0px 0px;
`

export default ProfilePage