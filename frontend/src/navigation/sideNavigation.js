import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { UserContext } from "../context/userContext";


export default function SideNavigation (){

    const navigate = useNavigate();
    
    const location = useLocation();

    const {userDetail} = useContext(UserContext);

    const [activeLink, setActiveLink] = useState('');

    const handleClick = () =>{

        navigate('/');
    }

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
        localStorage.setItem('activeLink', linkName);
    };

    useEffect(() => {
        const savedActiveLink = localStorage.getItem('activeLink') || location.pathname.substring(1); // Default to current route
        setActiveLink(savedActiveLink);
    }, [location.pathname]);




    return(
        <section className='sideNavigation'>
            <div className='logoName logoNameSideNav'>
                {/* Logo */}
                <div className='logo sideNavLogo' onClick={handleClick}>
                </div>
                {/* Company Name */}
                <div className='shangri' onClick={handleClick}>
                    <span className='companyName sideNavName'>Shangri-La Petitions</span>
                </div>
            </div>

            
            {/* Main Navigation */} 
            <div className="navigationContent">
                <ul>

                    <div className={`listStyle userDashboard ${activeLink && activeLink !== 'dashboard' ? 'blurred' : ''}`}>
                        <span className="icon userIcon"></span>
                        <Link 
                            to={'/dashboard'}  
                            className={`link ${activeLink === 'dashboard' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('dashboard')}
                        >
                            <li className="userName">
                                {userDetail.fullName}
                            </li>
                        </Link>
                    </div>

                    {/* Petitions */}
                    <div className={`listStyle petitionsDashboard ${activeLink && activeLink !== 'petitions' ? 'blurred' : ''}`}>
                        <span className="icon petitionsIcon"></span>
                        <Link 
                            to={'/petitions'} 
                            className={`link ${activeLink === 'petitions' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('petitions')}
                        >
                            <li className="linkName">Petitions</li>
                        </Link>
                    </div>

                    {/* Add Petitions */}
                    <div className={`listStyle addPetitions ${activeLink && activeLink !== 'addPetition' ? 'blurred' : ''}`}>
                        <span className="icon addIcon"></span>
                        <Link 
                            to={'/addPetition'}  
                            className={`link ${activeLink === 'addPetition' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('addPetition')}
                        >
                            <li className="linkName">Add Petitions</li>
                        </Link>
                    </div>

                    {/* My Petitions */}
                    <div className={`listStyle myPetitions ${activeLink && activeLink !== 'myPetitions' ? 'blurred' : ''}`}>
                        <span className="icon myPetitionIcon"></span>
                        <Link 
                            to={'/myPetitions'}  
                            className={`link ${activeLink === 'myPetitions' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('myPetitions')}
                        >
                            <li className="linkName">My Petitions</li>
                        </Link>
                    </div>
                </ul>
            </div>
            
        
           
        </section>
    )
}