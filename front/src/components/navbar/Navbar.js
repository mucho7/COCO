import NavbarItem from "./NavbarItem"
import NavbarSearch from './NavbarSearch'
import { useCookies } from 'react-cookie'

import { Grid } from '@mui/material'

function Navbar() {
    const [ cookie, ] = useCookies(['userInfo'])
    console.log(cookie)
    // 차후에 정확히 설정해야할 route들
    const leftNavList = [
        {name: "Session", bold: false, url: "/room",},
        {name: "Community", bold: false, url: "/community",},
    ]
    const rightNavList = [
        {name: "Log In", bold: false, url: "/useri/login",},
        {name: "Sign Up", bold: true, url: "/useri",},
    ]
    const logedInNavList = [
        {name: "Profile", bold: false, url: "/useri/user_id",},
        {name: "Log Out", bold: true, url: "/",},
    ]

    return (
        <div>
            <Grid container spacing={1} style={Nav}>
                <Grid item xs={1}>
                    <NavbarItem navList={[{name: "COCO", url: "/", bold: true}]}/>
                </Grid>
                <Grid item xs={3}>
                    <NavbarItem navList={leftNavList}/>
                </Grid>
                <Grid item xs={5}>
                    <NavbarSearch/>
                </Grid>
                <Grid item xs={3}>
                    {cookie.jwt_token === null
                    ?
                    <NavbarItem navList={logedInNavList}/>
                    :
                    <NavbarItem navList={rightNavList}/>
                }
                </Grid>
            </Grid>
        </div>
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