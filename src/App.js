import { BrowserRouter, Navigate, Route, Routes,} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './Components/redux/reducers-slices/userSlice';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error';



function App() {

  const isAuthenticated = useSelector(selectUser);

  return (
    <BrowserRouter>
      <>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />} />
            <Route path='*' element={<Error/>} />
          </Routes>
        <Footer/>
      </>
    </BrowserRouter>
  );
}

export default App;
