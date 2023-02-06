import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { logout } from "../api/member"

function LogoutPage() {
    const navigate = useNavigate()
    const [ cookie, setCookie ] = useCookies(["userInfo"])

    const token = {
        'Authorization': cookie.userInfo.jwt_token,
        'refreshToken':  cookie.userInfo.refresh_token,
    }

    async function log_out() {
        await logout(
        token,
        (data) => {
            console.log(data)
            localStorage.clear()
            setCookie(["userInfo"], undefined)
            navigate("/")
        },
        (error) => {
            console.log(error);
        }
    )}

    useEffect(() => {
        log_out()
    }, )
}

export default LogoutPage