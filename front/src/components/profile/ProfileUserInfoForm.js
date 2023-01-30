import styled from "styled-components"
import { useState } from "react"

function ProfileUserInfoForm(props) {
    const [inputEmail, setInputEmail] = useState()
    
    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'User E-Mail':
                setInputEmail(e.target.value)
                console.log(e.target.value, inputEmail)
                break
            default:
                // nothing
        }
    }

    return (
        <Col>
            {props.userInfo.map((item) => {
                return (
                    <UserInfoBox key={item.name}>
                        <UserInfoNameBox>
                            {item.name}
                        </UserInfoNameBox>
                        <UserInfoContentForm id={item.name} onChange={onTypingHandler} placeholder={item.content}/>
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
const UserInfoContentForm = styled.input`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 29px;

    background-color: white;
    opacity: 1;
    color: black;
    width: 80%;

    border-radius: 10px;

    text-align: center;
    margin-left: calc(10%);
    &:focus {
        outline: internal;
    }
`

export default ProfileUserInfoForm