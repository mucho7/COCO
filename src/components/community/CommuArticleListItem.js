import { Link } from "react-router-dom"

import { Card, CardActionArea, CardContent,  } from '@mui/material'

function CommuArticleListItem(props) {
    return (
        <>
        {props.articles.map(article => {
            return (
                <Card sx={{ width: '100%', height: 'auto', margin: '4px'}} key={article.id}>
                    <CardActionArea>
                        <Link to={`${article.id}`} state={article} style={{textDecoration: 'none', color: 'black'}}>
                            <CardContent style={{paddingBottom: 16}}>
                                <div>{article.title}</div>
                                <div>작성자 {article.writer} 조회수 {article.hit} 생성일자 {article.createdAt.slice(5, 10)}</div>
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