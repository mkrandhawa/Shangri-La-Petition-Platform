// Header.js
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/userContext";
import { postData } from "../fetchRoutes/postData";
import MobileNavigation from './mobileNavigation';
import Navigation from './navigation'; // Import Navigation component

export default function Header() {
    const url = process.env.REACT_APP_LOGOUT_URL;
    const navigate = useNavigate();
    const { userDetail, isLogged, setIsLogged } = useContext(UserContext);

    const handleClick = () => {
        navigate('/');
    };

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
            console.error('Error checking auth:', err);
            alert('An error occurred. Please try again later.');
        }
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    return (
        <header>
            <div className='logoName'>
                {/* Logo */}
                <div className='logo' onClick={handleClick}></div>
                {/* Company Name */}
                <div className='shangri' onClick={handleClick}>
                    <span className='companyName'>Shangri-La Petitions</span>
                </div>
            </div>
            {isMobile && <MobileNavigation />}  {/* Show mobile navigation if on mobile */}
            {/* Main Navigation */}
            <Navigation 
                isLogged={isLogged} 
                userDetail={userDetail} 
                handleLogout={handleLogout} 
            
            />
        </header>
    );
}
