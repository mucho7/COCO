import { useState } from "react"
import { useCookies } from "react-cookie"
import { useLocation, Link } from "react-router-dom"
import MonacoEditor from "@monaco-editor/react"

import { articleUpdate } from "../../api/community"

import styled from "styled-components"
import { Button, TextField } from "@mui/material"
import { useEffect } from "react"

function ArticleUpdate() {
    const location = useLocation()
    const [ cookie ] = useCookies(["userInfo"])
    
    const [inputTitle, setInputTitle ] = useState("")
    const [inputContent, setInputContent ] = useState("")
    const [inputCode, setInputCode] = useState("")
    const [pk, setPk] = useState("")
    
    const onTypingHandler = (e) => {
        // 4개의 케이스에 따라 각자의 스테이트에 저장
        switch (e.target.id) {
            case 'title':
                setInputTitle(e.target.value)
                break
            case 'content':
                setInputContent(e.target.value)
                break
            default:
                // nothing
        }
    }

    const onCodeTypingHandler = (e) => {
        setInputCode(e)
    }

    
    const updateArticle ={
        title: inputTitle,
        code: inputCode,
        content: inputContent,
        writer: window.localStorage.getItem("userId"),
        id: pk,
        jwt_token: cookie.userInfo.jwt_token,
        refresh_token: cookie.userInfo.refresh_token
    }
    const article = location.state

    useEffect(() => {
        setPk(article.id)
        setInputTitle(article.title)
        setInputContent(article.rawContent)
        setInputCode(article.code)

    }, [article])

    async function onClickHandler(event) {
        if (inputTitle === undefined || inputContent === undefined){
            alert("제목이나 내용은 필수 입력입니다!!")
        } else if (inputTitle.trim() === "" || inputContent.trim() === "") {
            alert("제목이나 내용엔 공백이 아닌 문자가 있어야 합니다!!")
        } else if (inputTitle.length > 255) {
            alert("제목의 길이는 최대 255자 까지입니다.")
        } else if (inputContent.length > 3000) {
            alert("본문의 길이는 최대 3000자 까지입니다.")
        } else if (inputCode.length > 3000) {
            alert("코드의 길이는 최대 3000자 까지입니다.")
        } else {
            console.log(updateArticle)
            await articleUpdate(
                updateArticle,
                (data) => {
                    console.log(data)
                },
                (err) => console.log(err)
            )
        }
    }

    return (
        <>
            <TitleSection>
                <TextField value={updateArticle.title} onChange={onTypingHandler} id="title" autoFocus placeholder="제목" fullWidth />
            </TitleSection>
            <hr/>
            <ArticleSection>
                <ContentSection style={{paddingTop: 20}}>
                    <TextField value={updateArticle.content} onChange={onTypingHandler} id="content" minRows={18} fullWidth multiline style={{maxHeight: 450, overflowY: "auto"}} />
                </ContentSection>
                <Vr/>
                <CodeSection style={{paddingTop: 20}}>
                    <MonacoEditor id="editor" value={updateArticle.code} onChange={onCodeTypingHandler} />
                </CodeSection>
            </ArticleSection>
            <hr/>
            <Link to={`/community/${article.id}`} state={article} style={{textDecoration: "none"}}>
                <Button onClick={onClickHandler} variant="contained">수정 완료</Button>
            </Link>
        </>
    )
}


const TitleSection = styled.section`
    width: 100%;

    margin-top: 15px;
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
export default ArticleUpdate