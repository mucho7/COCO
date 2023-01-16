import { Link } from 'react-router-dom'
import './NavbarItem.css';

function NavbarItem(props) {
    
    return (
        <ul className='navbar-list'>
            {props.navList.map(item => {
                // 리스트 컴포넌트를 Link로 바꿔야함
                return <Link className='navbar-item' to={item.url} key={item.name}>{item.name}</Link>
            })}
        </ul>
    )
}


export default NavbarItem