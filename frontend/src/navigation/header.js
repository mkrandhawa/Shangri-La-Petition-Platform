import React from 'react';


export default function Header (){

    return(
        <header>

            <div className='logoName'>
                {/* Logo */}
                <div className='logo'>
                </div>
                {/* Company Name */}
                <div className='shangri'>
                    <span className='companyName'>Shangri-La Petitions</span>
                </div>
            </div>

            
            {/* Main Navigation */}
            <div className="navigation">
                <ul>
                    <li>
                        Home
                    </li>

                    <li>
                        Open Petitions
                    </li>

                    <li>
                        Log in
                    </li>

                </ul>
            </div>


        </header>
    )
}