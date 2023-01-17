import styled from "styled-components"

function CommuArticles(props) {

    return (
        <div>
            {props.articles.map(article => {
                return (
                        <CommuArticle>
                            <div>{article.title}</div>
                            <div>{article.content}</div>
                        </CommuArticle>
                    )
                })}
        </div>
    )
}

const CommuArticle = styled.article`
    height: 60px;
    padding-left: 10%;
    padding-right: 10%;

    display: flex;
    justify-content: space-between;
    align-items: center;

`

export default CommuArticles