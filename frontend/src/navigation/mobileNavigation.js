// MobileNavigation.js
import React, { useState, useEffect, useContext } from 'react';
import {useLocation, Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { postData } from '../fetchRoutes/postData';

export default function MobileNavigation() {

    const url = process.env.REACT_APP_LOGOUT_URL;
    const { userDetail, isLogged, setIsLogged } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const location = useLocation();
    const { isTouched, setIsTouched } = useContext(UserContext);


    const handleLogout = async () => {
        try {
            const response = await postData(url, userDetail);

            if (response.status === 'Success') {
                alert(response.message);
                setTimeout(() => {
                    setIsLogged(false);
                }, 500);
            }
        } catch (err) {
            alert('An error occurred. Please try again later.');
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsClicked(!isClicked);
    };

    const handleMenu = (path) => {
        if (location.pathname === path) setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isTouched) {
            setIsOpen(false);
            setIsTouched(false);
            setIsClicked(false);
        }
    }, [isTouched, setIsTouched]);

    return (
        <>
            <button onClick={toggleMenu} className={isClicked ? "humburger" : "closedMenu"}>
                ☰
            </button>
            

            {isOpen && (
                <div className={`menu ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <Link to={'/'} className='link' onClick={() => handleMenu('/')}>
                            <li>Home</li>
                        </Link>
        
                        {isLogged ? (
                            <>
                                {userDetail.role === 'petitioner' && (
                                    <Link to={'/dashboard'} className='link' onClick={() => handleMenu('/dashboard')}>
                                        <li>Dashboard</li>
                                    </Link>
                                )}
        
                                {userDetail.role === 'admin' && (
                                    <Link to={'/adminDashboard'} className='link' onClick={() => handleMenu('/adminDashboard')}>
                                        <li>Dashboard</li>
                                    </Link>
                                )}
        
                                <Link to={'/'} className='link'>
                                    <li className='userName' onClick={()=> {handleLogout(); handleMenu('/')}}>
                                        Logout
                                    </li>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to={'/login'} className='link' onClick={() => handleMenu('/login')}>
                                    <li>Log in</li>
                                </Link>
        
                                <Link to={'/signUp'} className='link' onClick={() => handleMenu('/signUp')}>
                                    <li>Sign Up</li>
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
                
            )}
        </>
    );
}
