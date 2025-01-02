// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation({ isLogged, userDetail, handleLogout }) {
    return (
        <div className="navigation">
            <ul>
                <Link to={'/'} className='link'>
                    <li>Home</li>
                </Link>

                {isLogged ? (
                    <>
                        {userDetail.role === 'petitioner' && (
                            <Link to={'/dashboard'} className='link'>
                                <li>Dashboard</li>
                            </Link>
                        )}

                        {userDetail.role === 'admin' && (
                            <Link to={'/adminDashboard'} className='link'>
                                <li>Dashboard</li>
                            </Link>
                        )}

                        <Link to={'/'} className='link'>
                            <li className='userName' onClick={handleLogout}>
                                Logout
                            </li>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to={'/login'} className='link'>
                            <li>Log in</li>
                        </Link>

                        <Link to={'/signUp'} className='link'>
                            <li>Sign Up</li>
                        </Link>
                    </>
                )}
            </ul>
        </div>
    );
}
