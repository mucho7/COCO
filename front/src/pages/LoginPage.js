import { LoginForm } from "../components/login"
import SidePaddingBox from './SidePaddingBox'
import  { Navbar } from '../components/navbar';

function LoginPage(params) {
    return (
        <SidePaddingBox>
            <Navbar />
            <LoginForm>
                
            </LoginForm>
        </SidePaddingBox>
    )   
}

export default LoginPage