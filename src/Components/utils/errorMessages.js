

export const handleLoginError = (errorData) => {
  console.log('Error Data HANDLE:', errorData);

  if (errorData.status === 400) {
    console.log ('le status d\'errorData dans handleLogin :', errorData.status)
    if (errorData.message && errorData.message.includes('Error: User not found!')) {
      console.log ('le status d\'errorData.message dans handleLger :', errorData.message )
      return 'Adresse e-mail non reconnue';
    } else if (errorData.message && errorData.message.includes('Error: Password is invalid')) {
      return 'Mot de passe incorrect';
    } else {
      return 'Champs invalides. Veuillez vérifier vos informations';
    }
  } else {
    return 'Une erreur s\'est produite lors de la connexion';
  }
};
