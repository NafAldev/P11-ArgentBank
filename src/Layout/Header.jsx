import React from "react";
import { Link } from 'react-router-dom';
import logo from '../img/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser } from "../Components/redux/reducers-slices/userSlice";




function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // console.log('User State:', user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    
    dispatch(logoutUser());
  }

  return (
    <header>
      <nav className="main-nav">
        <Link to='/' className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        {user ? (
          <div>
            <FontAwesomeIcon icon={faUserCircle} />
            <Link to="/" className="main-nav-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign Out
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} />
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header;
