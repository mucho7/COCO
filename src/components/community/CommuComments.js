import { Card, Button, CardContent, Typography, Grid, ButtonGroup } from "@mui/material"

function Comments(props) {
    console.log(props.comments.content)
    return (
        <>
        {props.comments.content.map(article => {
            return (
                <Card sx={{ width: '100%', height: 'auto', margin: '4px'}} key={article.id}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={1} textAlign="center">
                                <Typography>{article.content}</Typography>
                            </Grid>
                            <Grid item xs={8} textAlign="center">
                                <Typography>{article.writer}</Typography>
                            </Grid>
                            <Grid item xs={1} textAlign="center">
                                <Typography>{article.createdAt.slice(5, 10)}</Typography>
                            </Grid>
                            <Grid item xs={2} textAlign="center">
                                <ButtonGroup>
                                    <Button>수정</Button>
                                    <Button>삭제</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                )
            })}
        </>
    )
}

export default Comments