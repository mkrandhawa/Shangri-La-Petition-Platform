// MobileNavigation.js
import React, { useState, useEffect, useContext } from 'react';
import {useLocation, Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { postData } from '../fetchRoutes/postData';

export default function MobileNavigationHeader() {

    const url = process.env.REACT_APP_LOGOUT_URL;

    const location = useLocation();
    
    const { userDetail, isLogged, setIsLogged, isTouched, setIsTouched, totPetitionToReply } = useContext(UserContext);
    
    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('');


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

    const handleLinkClick = (linkName) => {
        
        setActiveLink(linkName);
    
        
       
        setIsOpen(false);
        setIsClicked(false);
        
    
        localStorage.setItem('activeLink', linkName);
    };
    
    useEffect(() => {
        const savedActiveLink = location.pathname.substring(1); 

        setActiveLink(savedActiveLink);

        
    }, [location.pathname]);
    

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

                <div className={`${isLogged ? 'menu' : 'notLogged open'} ${isOpen ? 'menu open': ''}`}>
                    <ul>

                        {!isLogged &&  
                            <Link className='link'>
                                <li>
                                    Home
                                </li>
                            </Link>
                        }
                        
        
                        {isLogged ? (
                            <>
                                {userDetail.role === 'petitioner' && (
                                    <>
                                        <section className='sideSection'>
                                            <div className="listStyle userDashboard resMobileLink">
                                                <span className="icon homeIcon resIcon"></span>
                                                <Link 
                                                    to={'/'}  
                                                    className={`link ${activeLink === '' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('')}
                                                >
                                                    <li>
                                                        Home
                                                    </li>
                                                </Link>
                                            </div>
                                            
                                            <div className="listStyle  userDashboard resMobileLink">
                                                <span className="icon userIcon resIcon"></span>
                                                <Link 
                                                    to={'/dashboard'}  
                                                    className={`link ${activeLink === 'dashboard' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('dashboard')}
                                                >
                                                    <li>
                                                        My Details
                                                    </li>
                                                </Link>
                                            </div>
                    
                                            {/* Petitions  */}
                                            <div className="listStyle petitionsDashboard resMobileLink ">
                                                <span className="icon petitionsIcon resIcon"></span>
                                                <Link 
                                                    to={'/slpp/petitions'}
                                                    className={`link ${activeLink === 'petitions'  || activeLink === 'slpp/petitions' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('petitions')}
                                                >
                                                    <li>All Petitions</li>
                                                </Link>
                                            </div>
                                            <div className="listStyle petitionsDashboard resMobileLink ">
                                                <span className="icon openPetitionsIcon resIcon"></span>
                                                <Link 
                                                    to="/slpp/petitions?status=open"
                                                    className={`link ${activeLink === 'open'  || activeLink === 'open' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('open')}
                                                >
                                                    <li>Open Petitions</li>
                                                </Link>
                                            </div>

                                            <div className="listStyle petitionsDashboard resMobileLink ">
                                                <span className="icon closedPetitionIcon resIcon"></span>

                                                <Link 
                                                    to="/slpp/petitions?status=closed"
                                                    className={`link ${activeLink === 'closed'  || activeLink === 'closed' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('closed')}
                                                >
                                                    <li>Closed Petitions</li>
                                                </Link>
                                                
                                            </div>
                    
                                            {/* Add Petitions */}
                                            <div className="listStyle addPetitions resMobileLink">
                                                <span className="icon addIcon resIcon"></span>
                                                <Link 
                                                    to={'/addPetition'}  
                                                    className={`link ${activeLink === 'addPetition' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('addPetition')}
                                                >
                                                    <li>Add Petitions</li>
                                                </Link>
                                            </div>
                    
                                            {/* My Petitions */}
                                            <div className="listStyle myPetitions resMobileLink">
                                                <span className="icon myPetitionIcon resIcon"></span>
                                                <Link 
                                                    to={'/myPetitions'}  
                                                    className={`link ${activeLink === 'myPetitions' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('myPetitions')}
                                                >
                                                    <li>My Petitions</li>
                                                </Link>
                                            </div>
                                        </section>
                                    </>

                                    
                                )}

                                {/* Add petition */}
                                {userDetail.role === 'admin' && (
                                    <>
                                        <section className='sideSection'>
                                            <div className="listStyle userDashboard resMobileLink">
                                                <span className="icon homeIcon resIcon"></span>
                                                <Link 
                                                    to={'/'}  
                                                    className={`link ${activeLink === '' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('')}
                                                >
                                                    <li>
                                                        Home
                                                    </li>
                                                </Link>
                                            </div>
                                            
                                            <div className="listStyle  userDashboard resMobileLink">
                                                <span className="icon userIcon resIcon"></span>
                                                <Link 
                                                    to={'/adminDashboard'}  
                                                    className={`link ${activeLink === 'dashboard' ? 'active' : ''}`}
                                                    onClick={() => {handleMenu('/adminDashboard'); handleLinkClick('dashboard')}}
                                                >
                                                    <li>
                                                        Dashboard
                                                    </li>
                                                </Link>
                                            </div>
                    
                                             {/* Petitions  */}
                                             <div className="listStyle petitionsDashboard resMobileLink ">
                                                <span className="icon petitionsIcon resIcon"></span>
                                                <Link 
                                                    to={'/slpp/petitions'}
                                                    className={`link ${activeLink === 'petitions'  || activeLink === 'slpp/petitions' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('petitions')}
                                                >
                                                    <li>All Petitions</li>
                                                </Link>
                                            </div>
                                            <div className="listStyle petitionsDashboard resMobileLink ">
                                                <span className="icon openPetitionsIcon resIcon"></span>
                                                <Link 
                                                    to="/slpp/petitions?status=open"
                                                    className={`link ${activeLink === 'open'  || activeLink === 'open' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('open')}
                                                >
                                                    <li>Open Petitions</li>
                                                </Link>
                                            </div>

                                            <div className="listStyle petitionsDashboard resMobileLink ">
                                                <span className="icon closedPetitionIcon resIcon"></span>

                                                <Link 
                                                    to="/slpp/petitions?status=closed"
                                                    className={`link ${activeLink === 'closed'  || activeLink === 'closed' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('closed')}
                                                >
                                                    <li>Closed Petitions</li>
                                                </Link>
                                                
                                            </div>
                                            {/* REACH THRESHOLD  */}
                                            <div className="listStyle replyLink resMobileLink">
                                                <span className="icon replyIcon resIcon"></span>
                                                <Link 
                                                    to={'/reply'}
                                                    className={`link ${activeLink === 'reply' ? 'active' : ''}`}
                                                    onClick={() => handleLinkClick('reply')}
                                                >
                                                    <li className="linkName">Reply</li>
                                                </Link>
                    
                                                {/* Display the circle with totPetition count */}
                                                {totPetitionToReply > 0 && (
                                                    <div className="notificationCircle">
                                                        <span>{totPetitionToReply}</span>
                                                    </div>
                                                )}
                    
                    
                                            </div>
                                            {/* SET THRESHOLD  */}
                                                <div className="listStyle addThreshold resMobileLink">
                                                        <span className="icon thresholdIcon resIcon"></span>
                                                        <Link 
                                                            to={'/setThreshold'}
                                                            className={`link ${activeLink === 'setThreshold' ? 'active' : ''}`}
                                                            onClick={() => handleLinkClick('setThreshold')}
                                                        >
                                                            <li className="linkName">Add Threshold</li>
                                                        </Link>
                                                </div>

                                            
                                        </section>
                                    </>
                                    
                                )}

                                <div className="listStyle logout resMobileLink">
                                    <span className="icon logoutIcon resIcon"></span>
                                    <Link to={'/'} className='link'>
                                        <li className='link' onClick={()=> {handleLogout(); handleMenu('/')}}>
                                            Logout
                                        </li>
                                    </Link>
                                </div>
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
