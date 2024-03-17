import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUsername } from './redux/actions/userAction';
import { selectProfile } from './redux/reducers-slices/profileSlice';

function UserProfileEditor() {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectProfile);
 
  // States des données de l'ui 
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEditUserOpen, setEditUserOpen] = useState(false);

  // Récupération du profil 
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // MAJ des données de l'ui avec les valeurs correspondantes
  useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.userName || '');
      setFirstName(userProfile.firstName || '');
      setLastName(userProfile.lastName || '');
    }
  }, [userProfile]);



  const handleUserNameChange = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  // // Soumission de l'username
  const handleUserNameSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUsername(userName));
    setEditUserOpen(false);
  };

  // Fermer le formulaire d'édition
  const handleCancel = () => {
    setEditUserOpen(false);
  };

  // Ouvrir le formulaire d'édition
  const handleOpenEditUserComponent = () => {
    setEditUserOpen(true);
  }



  return (
    <>
      {!isEditUserOpen ? (
        <div className="header">
          <h2>Welcome back<br />{firstName} {lastName}</h2>
          <button className="edit-button" onClick={handleOpenEditUserComponent}>Edit Name</button>
        </div>
      ) : (
        <div className='edit-user-info-container'>
          <h2>Edit user info</h2>
          <form onSubmit={handleUserNameSubmit} className='edit-user-info-form'>
            <div className='edit-user-info-input'>
              <label htmlFor='UserName'>User name</label>
              <input
                type='text'
                id='UserName'
                value={userName}
                onChange={handleUserNameChange}
              />
            </div>
            <div className='edit-user-info-input'> 
              <label htmlFor='FirstName'>First name</label>
              <input
                type='text'
                id='FirstName'
                value={firstName}
                disabled
              />
            </div>
            <div className='edit-user-info-input'>
              <label htmlFor='LastName'>Last name</label>
              <input
                type='text'
                id='LastName'
                value={lastName}
                disabled
              />
            </div>
            <div className='edit-user-buttons'>
              <button className='edit-user-button' type='submit'>Save</button>
              <button className='edit-user-button' type='button' onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}  
   

export default UserProfileEditor;
