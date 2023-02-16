import { useMemo, useState } from "react";
import { Link } from "react-router-dom"

import { getBoardImg } from "../../api/community";

import styled from "styled-components"
import { Card, CardContent, Grid,  } from '@mui/material'
import staticImg from '../../assets/Board/static.jpg';

function CommuArticleListItem(props) {
    const createdAt = props.article.createdAt
    const article = props.article
    const date = new Date()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')

    const [ boardImg, setBoardImg ] = useState(null)

    useMemo(() => {
        const getBoardIamge = async () => {
            await getBoardImg(
                props.article,
                (data) => {
                    return data.data
                },
                (err) => console.log(err)
            ).then((data) => {
                const newFile = new File([data], props.article.id);
                const reader = new FileReader();
                reader.onload = (event) => {
                    const previewImage = String(event.target?.result);
                    setBoardImg(previewImage);
                };
                reader.readAsDataURL(newFile);
            })
        }
        getBoardIamge()
    }, [])

    return (
        <Grid item xs={4} key={article.id} >
            <Link to={`${article.id}`} state={article} style={{textDecoration: 'none', color: 'black'}}>
                {/* <Card sx={{height: "200px", margin: '4px', background: '#333333', backgroundImage: `url(${boardImg})`}} > */}
                <Card sx={{height: "250px", margin: '4px', background: '#333333',}} >
                    <CardContent>
                        <ImageBox >
                            <img src={boardImg ? boardImg : "/assets/Board/static.jpg"} style={{width: "100%", overflow: "hidden"}} />
                        </ImageBox>
                        <TitleBox>{article.title}</TitleBox>
                        <CardContentItem >
                            {createdAt.slice(5, 7) === month
                                ? createdAt.slice(8, 10) === day 
                                    ? parseInt(createdAt.slice(11, 13)) + 9 === parseInt(hour) 
                                        ? createdAt.slice(14, 16) === minute
                                            ? "방금 전"
                                        : parseInt(minute) - parseInt(createdAt.slice(14, 16)) + "분 전"
                                    : parseInt(hour) - parseInt(createdAt.slice(11, 13)) - 9 + "시간 전"
                                : createdAt.slice(5, 10)
                            : createdAt.slice(5, 10)
                            }
                        </CardContentItem>
                        <CardContentItem> · {article.commentCnt} 개의 댓글</CardContentItem>
                        <hr style={{color: "#CCCCCC"}}/>
                        <Row>
                            <CardContentItem>by <b>{article.writer}</b></CardContentItem>
                            <CardContentItem>{article.hit} viewed</CardContentItem>
                        </Row>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
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

const ImageBox = styled.div`
    width: 100%;
    max-height: 100px;
    overflow: hidden;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`

export default CommuArticleListItem