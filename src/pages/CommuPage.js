import styled from "styled-components"
import { useState, useEffect } from "react"; 
// import { useDispatch } from "react-redux";

import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import { boardRead } from "../api/community";
// import { onAsyncRequest } from '../store/requestActionSlice'



import { CommuArticles, CommuSidebar } from "../components/community"

function CommuPage(params) {
    const [ someArticle, ] = useState(
        Object.entries({
            "title": "title",
            "writer": "ssafy223",
            "hit": 1,
            "createdAt": "2023-02-02T04:58:03"
        }))
    
    
    useEffect(() => {
        const enterBoard = async function(params) {
            await boardRead()
        }
        enterBoard()
    })

    // useEffect(() => {
    //     const enterBoard = async function () {
    //         await boardRead(
    //             (data) => {
    //                 console.log(data)
    //                 return data.data
    //             },
    //             (err) => console.log(err)
    //         )
    //         .then(data => {
    //             setSomeArticle(Object.entries(data))
    //         })
    //     }
    //     enterBoard()
    // })

    // console.log(someArticle)

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