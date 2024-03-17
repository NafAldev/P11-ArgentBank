import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { loginUser } from './redux/actions/authAction';
import { isValidEmail, isValidPassword } from './utils/regex';

import "./Form.css";


function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMeLocal] = useState (false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);
  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      // Gére la validation des champs
      setError('Veuillez saisir votre adresse e-mail et mot de passe.');
      return;
    } else if (!isValidEmail(email)) {
      setError('Veuillez saisir une adresse e-mail valide.');
      return;
    } else if (!isValidPassword(password)) {
      setError('Veuillez saisir votre mot de passe.');
      return;
    }

    let userCredentials = {
      email,
      password, 
      rememberMe,
    };

    dispatch(loginUser(userCredentials))
      .then((result) => {
        if (result.payload.status === 200) {
          setEmail('');
          setPassword('');
          navigate('/profile');
        } else {
          const messageError = result.payload.message;
          setError(messageError)
        }
      })
      .catch((error) => {
        console.error('Erreur détaillée:', error);
      });
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMeLocal(!rememberMe)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">
            {loading ? 'Loading...' : 'Login'}
          </button>

          <div className="error-message">
            {error && (
              <div className='alert-danger' role='alert'>
                {error}
              </div>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

export default Form;
