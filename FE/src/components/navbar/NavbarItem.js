import { Link } from 'react-router-dom'
import './NavbarItem.css';

function NavbarItem(props) {
    
    return (
        <div className='navbar-list'>
            {props.navList.map(item => {
                if (item.bold === true) {
                    return <Link className='navbar-item' to={item.url} key={item.name}><b>{item.name}</b></Link>
                } else {
                    return <Link className='navbar-item' to={item.url} key={item.name}>{item.name}</Link>
                }
            })}
        </div>
    )
}



// props를 활용한 크기 조절이 필요함

export default NavbarItem