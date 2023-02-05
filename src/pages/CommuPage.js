import styled from "styled-components"
import { useState, useMemo } from "react"; 
// import { useDispatch } from "react-redux";

import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import { boardRead } from "../api/community";
// import { onAsyncRequest } from '../store/requestActionSlice'



import { CommuArticles, CommuSidebar } from "../components/community"

function CommuPage() {
    const [ someArticle, setSomeArticle ] = useState([{id: 1}, {id: 2}])
    
    
    useMemo(() => {
        const enterBoard = async () => {
            await boardRead(
                (data) => {return data.data},
                (err) => console.log(err)
            )
            .then((data) => setSomeArticle(data))
        }
        enterBoard()
    }, [])

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