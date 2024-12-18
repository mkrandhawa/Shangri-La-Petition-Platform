import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage  from './home/homePage';
import LoginPage from './login/loginPage';


export default function App() {

  return (

    <>
      <BrowserRouter>
        <Routes>
          
          {/* Home Route */}
          <Route exact path='/' element={<HomePage />} />

          {/* Login Route */}
          <Route exact path='/login' element={<LoginPage />} />

        </Routes>
        
      </BrowserRouter>
    
    </>
  )
}

