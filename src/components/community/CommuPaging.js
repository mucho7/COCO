import styled from "styled-components"
import { Button } from "@mui/material"

function CommuPaging(params) {
    const index = [1, 2, 3, 4, 5]
    return(
        <PagingNumberBox>
            {index.map(item => {
                return (
                    <Button style={{textDecoration: "none"}} key={item}>{item}</Button>
                )
            })}
        </PagingNumberBox>
    )
}

const PagingNumberBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;

    margin-top: 15px;
`

export default CommuPaging