import React from 'react';
import UserProvider from './context/userContext';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage  from './home/homePage';
import LoginPage from './login/loginPage';
import SignUpPage from './signUp/signUpPage';
import AuthCheck from './fetchRoutes/authorization';
import UserDashboardPage from './userDashboard/dashboardPage';



export default function App() {

  return (

    <>
    <UserProvider>
        <BrowserRouter>

          <AuthCheck />
          <Routes>
            

            {/* Home Route */}
            <Route exact path='/' element={<HomePage />} />

            {/* Dashborad Routes */}
            <Route exact path='/dashboard' element={<UserDashboardPage />} />

            <Route exact path='/petitions' element={<UserDashboardPage />} />

            <Route exact path='/addPetition' element={<UserDashboardPage />} />

            <Route exact path='/myPetitions' element={<UserDashboardPage />} />

            {/* Login Route */}
            <Route exact path='/login' element={<LoginPage />} />

            {/* SignUp Route */}
            <Route exact path='/signUp' element={<SignUpPage />} />

          
          </Routes>
          
        </BrowserRouter>
    </UserProvider>
    
    </>
  )
}

