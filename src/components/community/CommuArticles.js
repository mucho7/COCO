import styled from "styled-components"
import { Card, CardActionArea, Typography, CardContent, Grid } from '@mui/material'
import { Link } from "react-router-dom"

function CommuArticles(props) {
    console.log(props.articles)

    return (
        <CommuArticle>
            {/* 페이징 기능은 차후에 달고, 일단은 slicing하여 사용 중 */}
            {props.articles.slice(0,8).map(article => {
                return (
                    <Card sx={{ width: '100%', height: 'auto', margin: '4px'}} key={article.id}>
                        <CardActionArea>
                            <Link to={`${article.id}`} state={article} style={{textDecoration: 'none', color: 'black'}}>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={4} textAlign="center">
                                            <Typography>{article.title}</Typography>
                                        </Grid>
                                        <Grid item xs={8} textAlign="center">
                                            <Typography>{article.writer}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                    )
                })}
        </CommuArticle>
    )
}

const CommuArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    width: 80%;

`

export default CommuArticles