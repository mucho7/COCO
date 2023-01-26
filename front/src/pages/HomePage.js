import  {HomeMainSession, HomeSessionList } from '../components/home'
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function HomePage() {
    return (
        <SidePaddingBox>
            <Navbar />
            <HomeMainSession/>
            <HomeSessionList/>
        </SidePaddingBox>
    )
}

export default HomePage;

