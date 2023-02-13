import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import { CommuArticleList, CommuSidebar,  } from "../components/community"

import styled from "styled-components"

function CommuPage() {

    return (
        <SidePaddingBox>
            <Navbar />
            <CommuSection>
                <CommuArticleList/>
                <CommuSidebar/>
            </CommuSection>
        </SidePaddingBox>
    )
}

const CommuSection = styled.section`
    display: flex;
    flex-direction: row;

    height: 500px;

`

export default CommuPage