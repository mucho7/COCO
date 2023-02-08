import { useState, useMemo } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"

import { CommentForm, Comments, CommuArticleDetailContent } from "./index"
import { boardDetail, articleDelete } from "../../api/community"

import styled from "styled-components"
import { Button, Typography } from "@mui/material"
import CommuCommentPaging from "./CommuCommentPaging"

function CommuArticleDetail() {
    const navigate = useNavigate()
    const location = useLocation()
    const pk = location.state.id
    const hit = location.state.hit

    const [ pageNumber, setPageNumber ] = useState(1)
    const [ maxPage, setMaxPage ] = useState(5)
    const [article, setArticle ] = useState({
        id: "",
        title:"",
        content: [{content:[""], index: -1},],
        code: [{content: [""], index: -1},],
        comments: {
            empty: true,
            totalPages: 1,
        },
        hit: hit
    })
    
    // article 정보를 가져옴
    useMemo(() => {
        const getArticlelDetail = async () => {
            await boardDetail(
            {pk: pk, pageNumber: pageNumber},
            (data) => {return data.data},
            (error) => console.log(error)
        ).then((data) => {
            setArticle(data)
            setMaxPage(article.comments.totalPages)
        })
    }
    if (hit === article.hit){
            getArticlelDetail()
            console.log("조회수 증가!!!")
    }
    }, [pk, article, pageNumber, hit])

    async function onClickDeleteHandler(params) {
        await articleDelete(
            pk,
            (data) => {
                console.log(data)
                navigate("/community")
            },
            (err) => console.log(err)
            )
    }

    const onPagingClickHandler = (page) => {
        // console.log(page)
        if (page.target === undefined) {
            setPageNumber(page)
        } else {
            setPageNumber(page.target.value)
        }
    }

    return (
        <>
            <TitleSection>
                <h2>{article.title}</h2>
                {/* <h2>static Title</h2> */}
                {article.writer === localStorage.userId ?  
                    <div>
                        <Link to={`/community/update/${pk}`} state={article} style={{textDecoration: "none"}} article={article}>
                            <Button variant="contained">수정</Button>
                        </Link>
                        <Button onClick={onClickDeleteHandler} variant="contained">삭제</Button>
                    </div>
                : ""}
            </TitleSection>
            <hr/>
            <ArticleSection>
                <CommuArticleDetailContent content={article} />
            </ArticleSection>
            <hr/>
            <CommentSectiom>
                {/* comment 작성 시 append하는 방법으로 해결하자 */}
                {window.localStorage.getItem("userId") !== null ? <CommentForm board_id={pk}/> : <Typography textAlign={"center"}>로그인 하시면 댓글을 쓸 수 있어요</Typography>}
                {article.comments.empty ? <Typography textAlign={"center"}>아직 댓글이 없어요!</Typography> : <Comments comments={article.comments}/> }
                <CommuCommentPaging maxPage={maxPage} onClick={onPagingClickHandler}/>
            </CommentSectiom>
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

// const ContentSection = styled.section`
//     width: 45%;
//     height: 500px;

// `
// const CodeSection = styled.section`
//     width: 45%;
//     height: 500px;
// `

const CommentSectiom = styled.section`
    width: 100%;
    margin-top: 15px;

`



export default CommuArticleDetail