import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage  from './home/homePage';
import LoginPage from './login/loginPage';
import SignUpPage from './signUp/signUpPage';


export default function App() {

  return (

    <>
      <BrowserRouter>
        <Routes>
          
          {/* Home Route */}
          <Route exact path='/' element={<HomePage />} />

          {/* Login Route */}
          <Route exact path='/login' element={<LoginPage />} />

          {/* SignUp Route */}
          <Route exact path='/signUp' element={<SignUpPage />} />

        </Routes>
        
      </BrowserRouter>
    
    </>
  )
}

