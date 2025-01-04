import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { UserContext } from "../context/userContext";


export default function SideNavigation (){

    const navigate = useNavigate();
    
    const location = useLocation();

    const {userDetail, totPetitionToReply} = useContext(UserContext);

    const [activeLink, setActiveLink] = useState('');

    const [showSubmenu, setShowSubmenu] = useState(false);

    const handleClick = () =>{

        navigate('/');
    }

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
  
        if (linkName === 'petitions' || linkName === 'slpp/petitions') {
            setShowSubmenu(!showSubmenu); // Toggle submenu visibility
        } else {
            setShowSubmenu(false); // Hide submenu if another link is clicked
        }
        localStorage.setItem('activeLink', linkName);
    };

    useEffect(() => {
        const savedActiveLink = location.pathname.substring(1); 

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
                    {userDetail.role === 'petitioner' ? (

                        // Petitioner Side Navigation
                    <>
                        
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

                        {/* Petitions  */}
                        <div className={`listStyle petitionsDashboard ${activeLink && activeLink !== 'petitions'  && activeLink !== 'slpp/petitions'? 'blurred' : ''}`}>
                            <span className="icon petitionsIcon"></span>
                            <Link 
                                className={`link ${activeLink === 'petitions'  || activeLink === 'slpp/petitions' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('petitions')}
                            >
                                <li className="linkName linkNamePetition">Petitions</li>
                            </Link>

                            {/* Submenu */}
                            {showSubmenu && (
                                <ul className="submenu">
                                    <li>
                                        <Link to="/slpp/petitions?status=open" className="submenu-item">
                                            Open 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/slpp/petitions?status=closed" className="submenu-item">
                                            Closed 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/slpp/petitions" className="submenu-item">
                                            All
                                        </Link>
                                    </li>
                                </ul>
                            )}
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
                    </>
                    ):(


                        // Admin Side Menu
                    <>
                        {/* ADMIN DASHBOARD */}
                        <div className={`listStyle userDashboard dashboard${activeLink && activeLink !== 'adminDashboard' ? 'blurred' : ''}`}>

                            <span className="icon userIcon"></span>
                            <Link 
                                to={'/adminDashboard'}  
                                className={`link ${activeLink === 'adminDashboard' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('adminDashboard')}
                            >
                                <li className="userName">
                                    {userDetail.fullName}
                                </li>
                            </Link>

                        </div>

            
                        {/* Petitions  */}
                        <div className={`listStyle petitionsDashboard ${activeLink && activeLink !== 'petitions' ? 'blurred' : ''}`}>
                            <span className="icon petitionsIcon"></span>
                            <Link 
                                className={`link ${activeLink === 'petitions' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('petitions')}
                            >
                                <li className="linkName">Petitions</li>
                            </Link>

                            {/* Submenu */}
                            {showSubmenu && (
                                <ul className="submenu">
                                    <li>
                                        <Link to="/slpp/petitions?status=open" className="submenu-item">
                                            Open 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/slpp/petitions?status=closed" className="submenu-item">
                                            Closed 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/slpp/petitions" className="submenu-item">
                                            All
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>



                        {/* REACH THRESHOLD  */}
                        <div className={`listStyle replyLink ${activeLink && activeLink !== 'reply' ? 'blurred' : ''}`}>
                            <span className="icon replyIcon"></span>
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
                        <div className={`listStyle addThreshold ${activeLink && activeLink !== 'setThreshold' ? 'blurred' : ''}`}>
                                <span className="icon thresholdIcon"></span>
                                <Link 
                                    to={'/setThreshold'}
                                    className={`link ${activeLink === 'setThreshold' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('setThreshold')}
                                >
                                    <li className="linkName">Add Threshold</li>
                                </Link>
                        </div>
        
                        
                    </>
                    )
                    }
                    

                </ul>
            </div>
            
        </section>
    )
}