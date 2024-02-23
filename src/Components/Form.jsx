
  import React, { useState } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
  import { useDispatch, useSelector } from 'react-redux';
  import { loginUser } from './redux/actions/authApi';
  import { useNavigate } from 'react-router-dom';
  import { isValidEmail, isValidPassword } from './utils/regex';



  
  import "./Form.css";


  
  function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { loading } = useSelector((state) => state.user);
    
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      if (!email && !password) {
        // Gérer la validation des champs
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
        password
      };
  
    
    console.log('Request payload:', userCredentials);


    dispatch(loginUser(userCredentials))
    .then((result) => {
        if (result.payload.status === 200) {
            setEmail('');
            setPassword('');
            navigate('/profile');
        } else {
            // console.log('Erreur de résultat complète:', result);
            const messageError = result.payload.error.message;
            // console.log('que contient messageError :', messageError)
           setError(messageError)
        }
    })
    .catch((error) => {
        console.error('Erreur détaillée:', error);
        
});

console.log('Error state in component:', error);

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
              <input type="checkbox" id="remember-me" />
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
  