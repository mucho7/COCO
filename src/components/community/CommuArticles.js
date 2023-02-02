import styled from "styled-components"
import { Card, CardActionArea, Typography, CardContent } from '@mui/material'
import { Link } from "react-router-dom"

function CommuArticles(props) {

    return (
        <CommuArticle>
            {props.articles.map(article => {
                return (
                    <Card sx={{ width: '100%', height: 'auto', margin: '4px'}} key={article.title}>
                        <CardActionArea>
                        <Link to={`${article.pk}`} style={{textDecoration: 'none', color: 'black'}}>
                        <CardContent>
                            <Typography variant="b">
                                {article.title}
                            </Typography>
                            <Typography>{article.content}</Typography>
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