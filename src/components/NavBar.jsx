import React from 'react';
import Logo from '../assets/images/logo.png';
function NavBar(){
    return(
        <div className="nav-bar-container">
            <div className="nav-bar-logo-container">
                <img alt="emersonlogo" src={Logo}/>
            </div>
        </div>
    )
}
export default NavBar;