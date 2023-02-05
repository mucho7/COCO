import { useState } from "react"
import { Button, TextField } from "@mui/material"


function CommentForm(params) {
    const [ comment, setComment ] = useState("")

    const onTypingHandler = (e) => {
        setComment(e.target.value)
        console.log(comment)
    }

    return (
        <>
            <TextField onChange={onTypingHandler} />
            <Button variant="contained">작성</Button>
        </>
    )    
}

export default CommentForm