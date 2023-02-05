import { useState, useMemo } from "react"
import { useLocation } from "react-router-dom"

import {CommentForm, Comments } from "./index"
import { boardDetail } from "../../api/community"

import styled from "styled-components"
import { Button, Typography } from "@mui/material"

function CommuArticleDetail() {
    const state = useLocation()
    const pk = state.pathname.slice(11)
    const [article, setArticle ] = useState({
        id: "",
        content: "",
        code: "",
        comments: {
            empty: true
        }
    })
    
    // article 정보를 가져옴
    useMemo(() => {
        const getArticlelDetail = async () => {
            await boardDetail(
            pk,
            (data) => {return data.data},
            (error) => console.log(error)
        ).then((data) => setArticle(data))
    }
    getArticlelDetail()
    }, [pk])

    return (
        <>
        <TitleSection>
            <h2>{article.title}</h2>
            <div>
                <Button>수정</Button>
                <Button>삭제</Button>
            </div>
        </TitleSection>
        <hr/>
            <ArticleSection>
                <ContentSection>
                    {article.content}
                </ContentSection>
                <Vr/>
                <CodeSection>
                    {article.code}
                </CodeSection>
            </ArticleSection>
        <hr/>

            <CommentSectiom>
                {window.localStorage.getItem("userId") === undefined ? <CommentForm/> : <Typography textAlign={"center"}>로그인 하시면 댓글을 쓸 수 있어요</Typography>}
                {article.comments.empty ? <Typography textAlign={"center"}>아직 댓글이 없어요!</Typography> : <Comments comments={article.comments}/> }
            </CommentSectiom>
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
const CommentSectiom = styled.section`
    width: 100%;
    height: 100px;

`

const Vr = styled.div`
    width: 1px;
    height: 100%;

    background: gray;
`

export default CommuArticleDetail