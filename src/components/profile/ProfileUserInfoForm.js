import { useState } from "react"
import { Button } from "@mui/material"
import { useCookies } from "react-cookie"

import { updateUserInfo } from "../../api/member"

import styled from "styled-components"

function ProfileUserInfoForm(props) {
    const [ cookie ] = useCookies(['userInfo'])
    const [inputEmail, setInputEmail] = useState()
    const [inputName, setInputName] = useState()
    
    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'User E-Mail':
                setInputEmail(e.target.value)
                console.log(e.target.value, inputEmail)
                break
            case 'User Name':
                setInputName(e.target.value)
                console.log(e.target.value, inputName)
                break
            default:
                // nothing
        }
    }

    const updating_user_info = {
        email: inputEmail,
        name: inputName,
        'Authorization': cookie.userInfo.jwt_token,
        'refreshToken':  cookie.userInfo.refresh_token,
    }

    async function updateUser() {
        await updateUserInfo(
            updating_user_info,
        )
    }

    return (
        <Col>
            {props.userInfo.map((item) => {
                if (item.updatable) {
                    return (
                        <UserInfoBox key={item.name}>
                            <UserInfoNameBox>
                                {item.name}
                            </UserInfoNameBox>
                            <UserInfoContentForm id={item.name} onChange={onTypingHandler} placeholder={item.content}/>
                        </UserInfoBox>
                    )
                } else {
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
                }
            })}
            <Button onClick={updateUser} >임시 버튼</Button>
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

export default ProfileUserInfoForm