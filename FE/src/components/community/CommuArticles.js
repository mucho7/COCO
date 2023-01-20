import styled from "styled-components"
import { Card, CardActionArea, Typography, CardContent } from '@mui/material'

function CommuArticles(props) {

    return (
        <CommuArticle>
            {props.articles.map(article => {
                console.log('yes')
                return (
                    <Card sx={{ width: '100%', height: 'auto', margin: '4px'}} key={article.title}>
                        <CardActionArea>
                            <CardContent>
                            <Typography component="b">
                                {article.title}
                            </Typography>
                                <div>{article.content}</div>
                            </CardContent>
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