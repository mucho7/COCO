import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import { CommuArticleList,  } from "../components/community"
import CommuToolBar from '../components/community/CommuToolBar';

function CommuPage() {

    return (
        <SidePaddingBox>
            <Navbar />
            <CommuToolBar/>
            <CommuArticleList/>
        </SidePaddingBox>
    )
}

export default CommuPage