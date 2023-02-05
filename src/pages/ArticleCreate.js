import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import { CommuArticleCreate } from '../components/community'

function ArticleCreate(params) {

    return (
        <SidePaddingBox>
            <Navbar />
            <CommuArticleCreate/>
        </SidePaddingBox>
    )
}

export default ArticleCreate