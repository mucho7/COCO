import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'

// Logout 기능을 수행하고 정상처리 된다면 Main page로 redirect
function LogoutPage(params) {
    const navigate = useNavigate()
    const [ token, removeToken ] = useCookies(['userInfo'])

    useEffect(() => {
        removeToken('userInfo')
        console.log(token)
        navigate('/')
    })
}

export default LogoutPage