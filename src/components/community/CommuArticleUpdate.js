import { useState } from "react"
import { useCookies } from "react-cookie"
import { useLocation, Link } from "react-router-dom"

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
            case 'code':
                setInputCode(e.target.value)
                break
            default:
                // nothing
        }
    }
    
    const updateArticle ={
        title: inputTitle,
        code: inputCode,
        rawContent: inputContent,
        writer: window.localStorage.getItem("userId"),
        id: pk,
        tokenL: {
            jwt_token: cookie.userInfo,
            refresh_token: cookie.userInfo
        }
    }

    const article = location.state

    useEffect(() => {
        setPk(article.id)
        setInputTitle(article.title)
        setInputContent(article.rawContent)
        setInputCode(article.code)

    }, [article])

    async function onClickHandler() {
        if (inputTitle === undefined || inputContent === undefined){
            alert("제목이나 내용은 필수 입력입니다!!")
        } else if (inputTitle.trim() === "" || inputContent.trim() === "") {
            alert("제목이나 내용엔 공백이 아닌 문자가 있어야 합니다!!")
        } else {
            await articleUpdate(
                updateArticle,
                (data) => console.log(data),
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
                    <TextField value={updateArticle.rawContent} onChange={onTypingHandler} id="content" minRows={18} fullWidth multiline style={{maxHeight: 450, overflowY: "auto"}} />
                </ContentSection>
                <Vr/>
                <CodeSection style={{paddingTop: 20}}>
                    <TextField value={updateArticle.code} onChange={onTypingHandler} id="code" minRows={18} fullWidth multiline style={{maxHeight: 450, overflowY: "auto"}} />
                </CodeSection>
            </ArticleSection>
            <hr/>
            <Link to={`/community/${pk}`} state={article}>
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