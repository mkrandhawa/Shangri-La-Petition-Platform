import React from 'react';
import {Link, useNavigate} from 'react-router-dom';


export default function Header (){

    const navigate = useNavigate();

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
            <div className="navigation">
                <ul>
                    <Link to={'/'} className='link'>
                        <li>
                            Home
                        </li>
                    </Link>

                    <Link to={'/petitions'}  className='link'>
                        <li>
                            Petitions
                        </li>
                    </Link>

                    <Link to={'/login'}  className='link'>
                        <li>
                            Log in
                        </li>
                    </Link>

                </ul>
            </div>
        </header>
    )
}