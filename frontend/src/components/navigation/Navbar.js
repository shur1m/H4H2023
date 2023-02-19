import './Navbar.css';

import logo from '../../assets/logo0.svg';



const Navbar= ({docTitle}) =>{
  return (
      <div className="navbar">
        <img src={logo} className="logo" alt="logo" />
        <div>{docTitle === '' ? 'Progress Planted' : docTitle}</div>
      </div>
  );
}

export default Navbar;
