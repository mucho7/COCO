import { Link } from "react-router-dom"

import { Card, CardActionArea, Typography, CardContent, Grid } from '@mui/material'

function CommuArticleListItem(props) {
    return (
        <>
        {props.articles.map(article => {
            return (
                <Card sx={{ width: '100%', height: 'auto', margin: '4px'}} key={article.id}>
                    <CardActionArea>
                        <Link to={`${article.id}`} state={article} style={{textDecoration: 'none', color: 'black'}}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={4} textAlign="center">
                                        <Typography>{article.title}</Typography>
                                    </Grid>
                                    <Grid item xs={3} textAlign="center">
                                        <Typography>{article.writer}</Typography>
                                    </Grid>
                                    <Grid item xs={5} textAlign="center">
                                        <Typography>{article.hit}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            )
        })}
        </>
    )
    
}

export default CommuArticleListItem