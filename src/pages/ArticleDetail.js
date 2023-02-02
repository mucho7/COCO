import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';
import { CommuArticleDetail } from '../components/community'

function ArticleDetail(params) {

    return (
        <SidePaddingBox>
            <Navbar />
            <CommuArticleDetail></CommuArticleDetail>
        </SidePaddingBox>
    )
}

export default ArticleDetail