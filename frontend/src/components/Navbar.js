import './Navbar.css';
import logo from '../assets/logo0.svg';


const Navbar= () =>{
  return (
    <header className="header">
        <div className="left-navbar">
        <img src={logo} className="logo" alt="logo" />
            Title
        </div>
    </header>
  );
}

export default Navbar;
