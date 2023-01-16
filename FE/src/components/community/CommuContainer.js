import styled from "styled-components"
import CommuArticles from "./CommuArticles"

function CommuContainer(params) {

    const someArticle = [
        {title: "1st Article", content: "1st Article"},
        {title: "2nd Article", content: "2nd Article"},
        {title: "3rd Article", content: "3rd Article"},
        {title: "4th Article", content: "4th Article"},
    ]

    return (
        <CommuSection>
            <CommuArticles articles={someArticle}/>
        </CommuSection>
    )
}

const CommuSection = styled.section`
    margin-left: 10%;
    margin-right: 10%;

    height: 600px;

    border: solid black;
`

export default CommuContainer