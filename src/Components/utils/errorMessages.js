export const handleLoginError = (errorData) => {
  if (errorData.status === 400) {
    if (errorData.message && errorData.message.includes('Error: User not found!')) {
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
