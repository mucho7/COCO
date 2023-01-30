import styled from "styled-components"

function ProfileUserInfoItem(props) {
    return (
        <Col>
            {props.userInfo.map((item) => {
                return (
                    <UserInfoBox key={item.name}>
                        <UserInfoNameBox>
                            {item.name}
                        </UserInfoNameBox>
                        <UserInfoContentBox>
                            {item.content}
                        </UserInfoContentBox>
                    </UserInfoBox>
                )
            })}
        </Col>
    )
}

const UserInfoBox = styled.div `
    width: 20rem;
    height: 70px;

    background-color: #14213D;
    color: white;

    border-radius: 8px;
`

const Col = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    height: 100%;
`

const UserInfoNameBox = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    line-height: 22px;

    margin-top: 10px;
    margin-left: 10px;
`

const UserInfoContentBox = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 29px;

    text-align: end;
    margin-top: 3px;
    margin-right: 5px;
`

export default ProfileUserInfoItem