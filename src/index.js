import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
// import store from './Components/redux/store';
// import { Provider } from 'react-redux';


// <Provider store={store}> a ajouter 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
        <App /> 
   
  </React.StrictMode>
);
