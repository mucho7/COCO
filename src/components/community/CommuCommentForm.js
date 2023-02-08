import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { commentCreate } from "../../api/community"

import styled from "styled-components"
import { Button, TextField } from "@mui/material"
function CommentForm(params) {
    const location = useLocation()
    
    const board_id = params.board_id
    const [ comment, setComment ] = useState("")

    const onTypingHandler = (e) => {
        setComment(e.target.value)
    }

    function onSubmitClickHandler() {
        commentCreate(
            {
                content: comment,
                board_id: board_id,
                writer: localStorage.userId
            },
            (data) => {
                console.log(data)
                setComment("")
                alert("댓글 작성 완료")
            },
            (err) => console.log(err)
        )
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