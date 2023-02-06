import { useState, useMemo } from "react"; 

import { boardRead,  } from "../../api/community";
import { CommuPaging, CommuArticleListItem } from "./index"

import styled from "styled-components"


function CommuArticleList() {
    const [ someArticle, setSomeArticle ] = useState([{id: 1}, {id: 2}])
    // const [ pageSize ] = useState(8)
    // const [ pageNumber,  ] = useState(1) 
    
    useMemo(() => {
        const enterBoard = async () => {
            await boardRead(
                (data) => {return data.data},
                (err) => console.log(err)
            )
            .then((data) => 
                setSomeArticle(data)) 
        }
        enterBoard()
    }, [])

    // useMemo(() => {
    //     const enterBoard_MK2 = async () => {
    //         await boardPaging(
    //             {"size": 8, "page": 2},
    //             (data) => console.log(data.data),
    //             (err) => console.log(err)
    //         )
    //         // .then((data) => console.log(data))
    //     }
    //     enterBoard_MK2()
    // }, [pageNumber, pageSize])

    return (
        <CommuArticleBox>
            <CommuArticleListItem articles={someArticle}/>
            <CommuPaging/>
        </CommuArticleBox>
    )
}

const CommuArticleBox = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    width: 80%;

`

export default CommuArticleList