import styled from '@emotion/styled';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import './NavbarItem.css';

function NavbarItem(props) {
    
    return (
        <NavContainer>
            {props.navList.map(item => {
                if (item.bold === true) {
                    return ( 
                        <Link className='navbar-item' to={item.url} key={item.name}>
                            <Button variant="contained" className="submit" fullWidth style={{height:"2.5rem", backgroundColor: "#FCA311"}}> <b>{item.name}</b></Button>
                        </Link>
                    )
                } else {
                    return <Link className='navbar-item' to={item.url} key={item.name}>{item.name}</Link>
                }
            })}
        </NavContainer>
    )
}

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    vertical-align: middle;
`


// props를 활용한 크기 조절이 필요함

export default NavbarItem