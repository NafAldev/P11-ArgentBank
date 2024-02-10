import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>
        <nav className="main-nav">
            <Link to='/' className="main-nav-logo" >
                <img
                className="main-nav-logo-image"
                src={logo}
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link to='/signIn' className="main-nav-item">
                <FontAwesomeIcon icon={faUserCircle} />
                Sign In
                </Link>
            </div>
        </nav>
    </header>
  )
}

export default Header
