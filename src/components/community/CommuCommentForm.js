import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { commentCreate } from "../../api/community"

import styled from "styled-components"
import { Button, TextField } from "@mui/material"
function CommentForm(params) {
    console.log(params)
    const location = useLocation()
    
    const board_id = params.board_id
    const [ comment, setComment ] = useState("")

    const onTypingHandler = (e) => {
        setComment(e.target.value)
    }

    function onSubmitClickHandler() {
        if (comment === undefined){
            alert("댓글 내용이 없습니다!")
        } else if (comment.trim() === "") {
            alert("댓글엔 공백이 아닌 문자가 있어야 합니다!!")
        } else {
            commentCreate(
                {
                    content: comment,
                    board_id: board_id,
                    writer: localStorage.userId
                },
                (data) => {
                    console.log(data)
                    setComment("")
                    params.isRenderNeeded()
                    alert("댓글 작성 완료")
                },
                (err) => console.log(err)
            )
        }
    }


    return (
        <CommentFormBox>
            <TextField value={comment} onChange={onTypingHandler} size="small" style={{width: "60%"}} />
            <Link to={location.pathname} state={{id: board_id}} style={{textDecoration: "none"}}>
                <Button onClick={onSubmitClickHandler} variant="contained" >작성</Button>
            </Link>
        </CommentFormBox>
    )    
}

const CommentFormBox = styled.div`
    display: flex;
    justify-content: center;
`

export default CommentForm