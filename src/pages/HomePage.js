import  {HomeMainSession, HomeSessionList, HomeCarousel } from '../components/home'
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function HomePage() {
    return (
        <>
        <SidePaddingBox>
            <Navbar />
        </SidePaddingBox>
            {/* <HomeMainSession/>
            <HomeSessionList/> */}
            {/* <HomeCarousel /> */}
        </>
    )
}

export default HomePage;

