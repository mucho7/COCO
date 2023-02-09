import styled from "styled-components"

import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

import SessionList from "../components/SessionList";
import SessionListSideBar from "../components/SessionList/SessinListSideBar";

function SessionListPage() {

    return (
        <SidePaddingBox>
            <Navbar />
            <SessionListSection>
                <SessionList/>
                <SessionListSideBar/>
            </SessionListSection>
        </SidePaddingBox>
    )
}

const SessionListSection = styled.section`
    display: flex;
    flex-direction: row;

    height: 100%;

`

export default SessionListPage;