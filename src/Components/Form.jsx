import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/reducers-slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { isFulfilled } from '@reduxjs/toolkit';



function Form()  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin=(e)=>{
        e.preventDefault();

        let userCredentials = { 
            email, password
        }
        dispatch(loginUser(userCredentials)).then((result)=>{
            if (isFulfilled ) {
               setEmail('');
               setPassword('');
               navigate ('/profile');

            }
        })
    }

  return (

    <main className="main bg-dark">
        <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
        <h1>Sign In</h1>
        <form  onSubmit={handleLogin}>
            <div className="input-wrapper">
                <label htmlFor="email">Username</label>
                <input 
                type="text" 
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" 
                id="password"
                value={password}
                onChange={(e=>setPassword(e.target.value))} />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button> 
        </form>
        </section>
    </main>
  )
}

export default Form