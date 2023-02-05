import NavbarItem from "./NavbarItem"
// import NavbarSearch from './NavbarSearch'
import { useState, useMemo } from "react"
import { useCookies } from 'react-cookie'

import { Grid } from '@mui/material'

function Navbar() {
    const [ cookie, setCookie ] = useCookies(["userInfo"])
    const [ userId, setUserId ] = useState("null")

    if (cookie.userInfo === undefined) setCookie("undefined")

    useMemo(() => {
        if (cookie.userInfo === undefined) setCookie("undefined")
        else (setUserId(cookie.userInfo.user_id))
    }, [setUserId, setCookie, cookie])

    const navlist = {
        left: [
            {name: "Session", highlight: false, url: "/room",},
            {name: "Community", highlight: false, url: "/community",},
        ],
        right: [
            {name: "Log In", highlight: false, url: "/useri/login",},
            {name: "Sign Up", highlight: true, url: "/useri",},
        ],
        loged: [
            {name: "profile", highlight: false, url: `/useri/${userId}`,},
            {name: "Log Out", highlight: true, url: "/useri/logout",},
        ]

    }
    // 차후에 정확히 설정해야할 route들


    return (
        <Grid container spacing={1} style={Nav}>
            <Grid item xs={1}>
                <NavbarItem navList={[{name: "COCO", url: "/", bold: true}]}/>
            </Grid>
            <Grid item xs={3}>
                <NavbarItem navList={navlist.left}/>
            </Grid>
            <Grid item xs={5}>
                {/* <NavbarSearch/> */}
            </Grid>
            <Grid item xs={3}>
                {cookie.userInfo === "undefined" ? <NavbarItem navList={navlist.loged}/> : <NavbarItem navList={navlist.right}/>}
            </Grid>
        </Grid>
    )
}

const Nav ={
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '13px',
    paddingBottom: '13px',
}


export default Navbar