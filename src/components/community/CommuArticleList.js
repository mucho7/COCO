import { useState, useMemo } from "react"; 

import { boardPaging } from "../../api/community";
import { CommuPaging, CommuArticleListItem } from "./index"

import styled from "styled-components"


function CommuArticleList() {
    const [ someArticle, setSomeArticle ] = useState([{id: 1}, {id: 2}])
    // 일단은 8로 고정하고 심화기능이 필요하다면 변경하는 버튼을 추가 예정
    const [ pageSize ] = useState(8)
    const [ pageNumber, setPageNumber ] = useState(1)
    const [ maxPage, setMaxPage ] = useState(5)

    useMemo(() => {
        const enterBoard = async () => {
            await boardPaging(
                {size: pageSize, page: pageNumber},
                (data) => {return data.data},
                (err) => console.log(err)
            ).then((data) => {
                setSomeArticle(data.content)
                setMaxPage(data.totalPages)
            })
        }
        enterBoard()
    }, [pageSize, pageNumber])

    const onPagingClickHandler = (page) => {
        // console.log(page)
        if (page.target === undefined) {
            setPageNumber(page)
        } else {
            setPageNumber(page.target.value)
        }
    }

    return (
        <CommuArticleBox>
            <CommuArticleListItem articles={someArticle}/>
            {/* 맨 밑으로 쳐박혔으면 */}
            <CommuPaging maxPage={maxPage} onClick={onPagingClickHandler}/>
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