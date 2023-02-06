import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

import { articleCreate } from "../../api/community"

import styled from "styled-components"
import { Button, TextField } from "@mui/material"

function ArticleCreate(params) {
    const navigate = useNavigate()
    const [ cookie ] = useCookies(["userInfo"])
    const [inputTitle, setInputTitle ] = useState()
    const [inputContent, setInputContent ] = useState()
    const [inputCode, setInputCode] = useState()
    
    // 로그인 안했다면 퇴장
    useEffect(() => {
        console.log(localStorage.getItem("userId"))
        if (localStorage.getItem("userId") === null) {
            navigate('/useri/login')
            alert("로그인이 필요한 서비스입니다.")
        }
    }, [navigate])

    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'title':
                setInputTitle(e.target.value)
                break
            case 'content':
                setInputContent(e.target.value)
                break
            case 'code':
                setInputCode(e.target.value)
                break
            default:
                // nothing
        }
    }

    const newArticle ={
        "title": inputTitle,
        "content": inputContent,
        "code": inputCode,
        "writer": window.localStorage.getItem("userId"),
        token: {
            jwt_token: cookie.userInfo,
            refresh_token: cookie.userInfo
        }
    }
    
    async function onClickHandler() {
        console.log(newArticle)

        await articleCreate(
            newArticle,
            // 성공 시에 해당 글로 navigate 해야함, response에 따라 좀 달라질듯
            (data) => {
                console.log(data)
                alert("작성완료")
                navigate("/community")
            },
            (err) => console.log(err)
        )
    }

    return (
        <>
            <TitleSection>
                <TextField onChange={onTypingHandler} id="title" autoFocus label="제목" fullWidth />
            </TitleSection>
            <hr/>
            <ArticleSection>
                <ContentSection >
                    <TextField onChange={onTypingHandler} id="content" placeholder="Content" minRows={18} fullWidth multiline style={{maxHeight: 450, overflowY: "auto"}} />
                </ContentSection>
                <Vr/>
                <CodeSection >
                    <TextField onChange={onTypingHandler} id="code" placeholder="Code" minRows={18} fullWidth multiline style={{maxHeight: 450, overflowY: "auto"}} />
                </CodeSection>
            </ArticleSection>
            <hr/>
            <Button onClick={onClickHandler} variant="contained">작성 완료</Button>
        </>
    )
}


const TitleSection = styled.section`
    width: 100%;

    padding-top: 15px;
    display: flex;
    justify-content: space-between;
`

const ArticleSection = styled.section`
    width: 100%;
    height: 500px;

    display: flex;
    justify-content: space-around;
`
const ContentSection = styled.section`
    width: 45%;
    height: 500px;

    padding-top: 15px;


`
const CodeSection = styled.section`
    width: 45%;
    height: 500px;
    
    padding-top: 15px;

`
const Vr = styled.div`
    width: 1px;
    height: 100%;

    background: gray;
`
export default ArticleCreate