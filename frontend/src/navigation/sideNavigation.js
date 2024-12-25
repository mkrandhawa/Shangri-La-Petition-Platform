import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from "../context/userContext";


export default function SideNavigation (){

    const navigate = useNavigate();

    const {userDetail} = useContext(UserContext);

    const handleClick = () =>{

        navigate('/');
    }



    return(
        <section className='sideNavigation'>
            <div className='logoName'>
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

                    <div className='listStyle userDashboard'>
                        <span className='icon userIcon'></span>
                        <Link to={'/dashboard'}  className='link'>
                            <li className='userName'>
                                {userDetail.fullName}
                            </li>
                        </Link>
                    </div>


                    <div className='listStyle petitionsDashboard'>
                        <span className='icon petitionsIcon'></span>
                        <Link to={'/petitions'} className='link'>
                            <li>
                                Petitions
                            </li>
                        </Link>
                    </div>

                    <div className='listStyle addPetitions'>
                        <span className='icon addIcon'></span>
                        <Link to={'/addPetition'}  className='link'>
                            <li>
                                Add Petitions
                            </li>
                        </Link>
                    </div>

                    <div className='listStyle myPetitions'>
                        <span className='icon myPetitionIcon'></span>
                        <Link to={'/myPetitions'}  className='link'>
                            <li>
                                My Petitions
                            </li>
                        </Link>
                    </div>

                </ul>
            </div>
            
        
           
        </section>
    )
}