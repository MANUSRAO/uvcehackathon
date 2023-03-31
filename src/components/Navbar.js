import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = ({name}) =>{
    return (
        <header>
        <nav className='navbar'>
        <a href="/" className="logo">
            <span className='header_name'>
                <span>Waste Managment System</span>
            </span>
        </a>
        <ul className='links'>
            <li><Link className='hover-underline-animation' to="/cluster" state={{name:name}} ><b>01 </b>Home</Link></li>
            <li><Link className='hover-underline-animation' to='/addtrash' state={{name:name}}><b>02 </b>Add Trash</Link></li>
            <li><Link className='hover-underline-animation' to='/cleartrash' state={{name:name}}><b>03 </b>Clear Trash</Link></li>
        </ul>
        <div className='toggle_btn'>
            <i className='fa-solid fa-bars'></i>
        </div>
      </nav>
      <div className='drop_down'>
            <ul className='links'>
            <li><Link className='hover-underline-animation' to="/cluster" state={{name:name}} ><b>01 </b>Home</Link></li>
            <li><Link className='hover-underline-animation' to='/addtrash' state={{name:name}}><b>02 </b>Add Trash</Link></li>
            <li><Link className='hover-underline-animation' to='/cleartrash' state={{name:name}}><b>03 </b>Clear Trash</Link></li>
            </ul>
        </div>
      </header>
    );
}

export default Navbar;
