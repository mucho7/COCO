import NavbarItem from "./NavbarItem"
import NavbarSearch from './NavbarSearch'

import { Grid } from '@mui/material'

function Navbar() {

    // 차후에 정확히 설정해야할 route들
    const leftNavList = [
        {name: "Session", bold: false, url: "/",},
        {name: "Community", bold: false, url: "/community",},
        {name: "Group", bold: false, url: "/group",},
    ]
    const rightNavList = [
        {name: "Log In", bold: false, url: "/useri/login",},
        {name: "Sign Up", bold: true, url: "/useri",},
        {name: "Profile", url: "/useri/user_id",},
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
                <Grid item xs={4}>
                    <NavbarSearch/>
                </Grid>
                <Grid item xs={3}>
                    <NavbarItem navList={rightNavList}/>
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