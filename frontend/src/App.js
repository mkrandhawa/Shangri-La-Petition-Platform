import React from 'react';
import UserProvider from './context/userContext';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage  from './home/homePage';
import LoginPage from './login/loginPage';
import SignUpPage from './signUp/signUpPage';
import AuthCheck from './fetchRoutes/authorization';
import UserDashboardPage from './dashboard/dashboardPage';
import AdminDashboardPage from './dashboard/adminDashboardPage';


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

            <Route exact path='/slpp/petitions' element={<UserDashboardPage />} />

            <Route exact path='/addPetition' element={<UserDashboardPage />} />

            <Route exact path='/myPetitions' element={<UserDashboardPage />} />

            {/* Admin Dashboard Routes */}

            <Route exact path='/adminDashboard' element={<AdminDashboardPage />} />

            <Route exact path='/slpp/petitions' element={<AdminDashboardPage />} />

            <Route exact path='/reply' element={<AdminDashboardPage />} />

            <Route exact path='/setThreshold' element={<AdminDashboardPage />} />


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

