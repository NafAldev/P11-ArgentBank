
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/argentBankLogo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectToken, selectUser } from "../Components/redux/reducers-slices/userSlice";
import { selectProfile } from '../Components/redux/reducers-slices/profileSlice';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const UserToken = useSelector(selectToken);
  const navigate = useNavigate(); 

  const userProfile = useSelector(selectProfile);
  const username = userProfile ? userProfile.userName : '';
  
  const handleLogout = (e) => {
    e.preventDefault(); 

    if (localStorage.getItem('userToken Local') === UserToken) {
      localStorage.removeItem('userToken Local');
    } else if (sessionStorage.getItem('userToken Session') === UserToken) {
      sessionStorage.removeItem('userToken Session');
    }
    
    dispatch(logoutUser());

    navigate('/');
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
          <div className="main-nav-signout" >
            <FontAwesomeIcon icon={faUserCircle} className="main-nav-icon" />
            <span className='main-nav-username'>{username}</span>
            <Link to="/" className="main-nav-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign Out
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} className="main-nav-icon" />
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header;
