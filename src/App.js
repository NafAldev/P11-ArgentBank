import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Error from './Pages/Error';


function App() {
  return (
    <BrowserRouter>
      <>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Dashboard/>}/>
            <Route path='*' element={<Error/>} />
          </Routes>
        <Footer/>
      </>
    </BrowserRouter>
  );
}

export default App;
