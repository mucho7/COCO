import { SigninForm } from "../components/signin"
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function SigninPage(params) {
    return (
        <SidePaddingBox>
            <Navbar />
            <SigninForm/>
        </SidePaddingBox>
    )
}

export default SigninPage