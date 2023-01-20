import styled from "styled-components"

import { CommuArticles, CommuSidebar } from "../components/community"

function CommuPage(params) {

    const someArticle = [
        {title: "1st Article", content: "1st Article"},
        {title: "2nd Article", content: "2nd Article"},
        {title: "3rd Article", content: "3rd Article"},
        {title: "4th Article", content: "4th Article"},
        {title: "5 Article", content: "1st Article"},
        {title: "6 Article", content: "2nd Article"},
        {title: "7 Article", content: "3rd Article"},
        {title: "8 Article", content: "4th Article"},
    ]

    return (
        <CommuSection>
            <CommuArticles articles={someArticle}/>
            <CommuSidebar/>
        </CommuSection>
    )
}

const CommuSection = styled.section`
    display: flex;
    flex-direction: row;

    height: 600px;

`

export default CommuPage