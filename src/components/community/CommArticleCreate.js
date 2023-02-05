import { useState } from "react"
import { useCookies } from "react-cookie"

import { articleCreate } from "../../api/community"

import styled from "styled-components"
import { Button, TextField } from "@mui/material"

function ArticleCreate(params) {
    const [ cookie ] = useCookies(["userInfo"])
    const [inputTitle, setInputTitle ] = useState()
    const [inputContent, setInputContent ] = useState()
    const [inputCode, setInputCode] = useState()
    
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
        title: inputTitle,
        content: inputContent,
        code: inputCode,
        writer: window.localStorage.getItem("userId"),
        tokenL: {
            jwt_token: cookie.userInfo,
            refresh_token: cookie.userInfo
        }
    }
    
    function onClickHandler() {
        articleCreate(
            newArticle,
            (data) => console.log(data),
            (err) => console.log(err)
        )
    }

    return (
        <>
            <TitleSection>
                <TextField onChange={onTypingHandler} id="title" autoFocus placeholder="제목" fullWidth />
            </TitleSection>
            <hr/>
            <ArticleSection>
                <ContentSection style={{paddingTop: 20}}>
                    <TextField onChange={onTypingHandler} id="content" minRows={18} fullWidth multiline style={{maxHeight: 450, overflowY: "auto"}} />
                </ContentSection>
                <Vr/>
                <CodeSection style={{paddingTop: 20}}>
                    <TextField onChange={onTypingHandler} id="code" minRows={18} fullWidth multiline style={{maxHeight: 450, overflowY: "auto"}} />
                </CodeSection>
            </ArticleSection>
            <hr/>
            <Button onClick={onClickHandler} variant="contained">작성 완료</Button>
        </>
    )
}


const TitleSection = styled.section`
    width: 100%;

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

`
const CodeSection = styled.section`
    width: 45%;
    height: 500px;

`
const Vr = styled.div`
    width: 1px;
    height: 100%;

    background: gray;
`
export default ArticleCreate