import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from "../context/userContext";


export default function Header (){

    const navigate = useNavigate();

    const {userDetail, isLogged} = useContext(UserContext);

    const handleClick = () =>{

        navigate('/');
    }



    return(
        <header>
            <div className='logoName'>
                {/* Logo */}
                <div className='logo' onClick={handleClick}>
                </div>
                {/* Company Name */}
                <div className='shangri' onClick={handleClick}>
                    <span className='companyName'>Shangri-La Petitions</span>
                </div>
            </div>

            
            {/* Main Navigation */}

            {isLogged ? (
                // If it is logged in
                <div className="navigation">
                    <ul>
                        <Link to={'/'} className='link'>
                            <li>
                                Home
                            </li>
                        </Link>

                        <Link to={'/dashboard'}  className='link'>
                            <li>
                                Dashboard
                            </li>
                        </Link>

                        <Link to={'/'}  className='link'>
                            <li className='userName'>
                                {userDetail.fullName}
                            </li>
                        </Link>

                    </ul>
                </div>
            ):(
                // If it is not logged in
                <div className="navigation">
                    <ul>
                        <Link to={'/login'}  className='link'>
                            <li>
                                Log in
                            </li>
                        </Link>

                        <Link to={'/signUp'} className='link'>
                            <li>
                                Sign Up
                            </li>

                        </Link>
                       

                    </ul>
                </div>

            )}
            
           
        </header>
    )
}