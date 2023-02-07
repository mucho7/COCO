import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, TextField } from "@mui/material"

import { commentCreate } from "../../api/community"
import styled from "styled-components"

function CommentForm(params) {
    const board_id = params.board_id
    const [ comment, setComment ] = useState("")

    const onTypingHandler = (e) => {
        setComment(e.target.value)
    }

    function onSubmitClickHandler(params) {
        commentCreate(
            {
                content: comment,
                board_id: board_id,
                writer: localStorage.userId
            },
            (data) => console.log(data),
            (err) => console.log(err)
        )
    }


    return (
        <CommentFormBox>
            <TextField onChange={onTypingHandler} size="small" style={{width: "60%"}} />
            <Link to={`/community/${board_id}`} state={{id: board_id}} style={{textDecoration: "none"}}>
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