import { Link } from "react-router-dom"

import { Card, CardActionArea, CardContent, Grid,  } from '@mui/material'
import styled from "styled-components"

function CommuArticleListItem(props) {
    const date = new Date()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')

    return (
        <>
        {props.articles.map(article => {
            const createdAt = article.createdAt
            return (
                <Grid item xs={4} key={article.id} >
                    <Link to={`${article.id}`} state={article} style={{textDecoration: 'none', color: 'black'}}>
                        <CardActionArea>
                            <Card sx={{height: "200px", margin: '4px', background: '#333333'}} >
                                <CardContent>
                                    <TitleBox>{article.title}</TitleBox>
                                    <CardContentItem >
                                        {createdAt.slice(5, 7) === month
                                            ? createdAt.slice(8, 10) === day 
                                                ? parseInt(createdAt.slice(11, 13)) + 9 === parseInt(hour) 
                                                    ? createdAt.slice(14, 16) === minute
                                                        ? "방금 전"
                                                    : parseInt(minute) - parseInt(createdAt.slice(14, 16)) + "분 전"
                                                : parseInt(hour) - parseInt(createdAt.slice(11, 13)) - 9 + "시간 전"
                                            : article.createdAt.slice(5, 10)
                                        : article.createdAt.slice(5, 10)
                                        }
                                    </CardContentItem>
                                    <CardContentItem> · {article.commentCnt} 개의 댓글</CardContentItem>
                                    <hr style={{color: "#CCCCCC"}}/>
                                    <Row>
                                        <CardContentItem>by <b>{article.writer}</b></CardContentItem>
                                        <CardContentItem>{article.hit} viewed</CardContentItem>
                                    </Row>
                                    {/* <div>작성자 {article.writer} 조회수 {article.hit} 생성일자 {article.createdAt.slice(5, 10)}</div> */}
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Link>
                </Grid>
            )
        })}
        </>
    )
}

const TitleBox = styled.h3`
    width: 90%;
    height: 24px;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    background: #333333;
    color: white;

`

const CardContentItem = styled.span`
    color: white;
    font-family: "Open Sans", sans-serif;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`

export default CommuArticleListItem