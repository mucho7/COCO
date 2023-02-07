import styled from "styled-components"

import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

import { CommuArticleList, CommuSidebar,  } from "../components/community"

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

    height: 100%;

`

export default CommuPage