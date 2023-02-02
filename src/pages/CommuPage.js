import styled from "styled-components"
import { useEffect } from "react"; 
import { useDispatch } from "react-redux";

import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
// import { onAsyncRequest } from '../store/requestActionSlice'


import { CommuArticles, CommuSidebar } from "../components/community"

function CommuPage(params) {
    const dispatch = useDispatch()
    // axios로 교체
    const someArticle = [
        {pk: 1, title: "1st Article", content: "1st Article"},
        {pk: 2, title: "2nd Article", content: "2nd Article"},
        {title: "3rd Article", content: "3rd Article"},
        {title: "4th Article", content: "4th Article"},
        {title: "5 Article", content: "1st Article"},
        {title: "6 Article", content: "2nd Article"},
        {title: "7 Article", content: "3rd Article"},
        {title: "8 Article", content: "4th Article"},
    ]
    const rquestInfo = {
        url: 'community',
        method: 'GET',
        body: null,
    }

    useEffect(() => {
        // dispatch(onAsyncRequest(rquestInfo))

    })

    

    return (
        <SidePaddingBox>
            <Navbar />
            <CommuSection>
                <CommuArticles articles={someArticle}/>
                <CommuSidebar/>
            </CommuSection>
        </SidePaddingBox>
    )
}

const CommuSection = styled.section`
    display: flex;
    flex-direction: row;

    height: 600px;

`

export default CommuPage