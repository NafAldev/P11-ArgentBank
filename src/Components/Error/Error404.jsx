import React from 'react'
import { Link } from 'react-router-dom';
import './Error404.css'
function Error404() {
  return (
    <div className="error">
          <p className="error_Number">404</p>
          <p className="error_Txt">Oops ! La page que vous demandez n'existe pas.</p>
          <Link to="/" className="error_HomeLink">
            Retourner sur la page d’accueil
          </Link>
      </div>
  )
}

export default Error404
