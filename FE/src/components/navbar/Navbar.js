import styled from "styled-components";
import NavbarItem from "./NavbarItem"
import NavbarSearch from './NavbarSearch'

function Navbar() {

    // 차후에 정확히 설정해야할 route들
    const leftNavList = [
        {name: "Session", url: "/",},
        {name: "Community", url: "/community",},
        {name: "Group", url: "/group",},
    ]
    const rightNavList = [
        {name: "Log In", url: "/useri/login",},
        {name: "Sign In", url: "/useri",},
        {name: "Profile", url: "/useri/user_id",},
    ]

    return (
        <Nav className="navbar">
            <NavbarItem navList={[{name: "Div for Logo", url: "/"}]}/>
            <NavbarItem navList={leftNavList}/>
            <NavbarSearch/>
            <NavbarItem navList={rightNavList}/>
        </Nav>
    )
}

const Nav = styled.nav`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 13px;
    padding-bottom: 13px;
`

export default Navbar