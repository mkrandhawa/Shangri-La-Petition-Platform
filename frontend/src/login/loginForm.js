import React, { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import Input from "../props/inputProp";
import { postData } from "../fetchRoutes/postData";
import { UserContext } from "../context/userContext";


export default function LoginForm(){

    const navigate = useNavigate();

    const url = 'http://localhost:8000/api/user/auth/login'

    const {setUserDetail, setIsLogged} = useContext(UserContext);

    const [user, setUser]= useState({
        email:'',
        password: ''
    });

    //   Assigns the user values 
    const handleChange = (event) =>{

        const {name, value} = event.target;

        setUser({...user, [name]: value});

    }

    //   Handle when the user submits the form
    const handleClick = (event)=>{

        event.preventDefault();

        // Async/Await to handle the post data
        (async () => {
            try {
                const response = await postData(url, user);
                // Password and email correct --> Send the user to the Open Petitions page
                if(response.status ==='Success'){
                    navigate('/'); // DO that OKAYYYYYYY
                    await setUserDetail({
                        fullName: response.data.fullName,
                        email: response.data.email
                    });
                    setIsLogged(true);

                }
                } catch (err) {
                    const errorElement = document.getElementsByClassName('errorMessage')[0];
                    errorElement.textContent = err.message;
                
            }
        })();

    }

    //   Handle when the user wants to signUp

    const handleSignUp =()=>{

        navigate('/signUp');
    }

    return (

        <main className="homePage loginPage">
            <div className="login">

                {/* Company Logo  */}

                <div className="signUpLogoContainer">
                    <span className="signUpLogo"></span>
                    {/* Form Title */}
                    <div className="formTitle"> Log In </div>
                </div>

                

                {/* Form Container */}
                <div className="loginFormContainer">
                    <form onSubmit={handleClick} className="loginForm">
                        <div className="inputs">
                            <label className="label">Email</label>
                            <Input
                                className="email"
                                type='email'
                                name='email'
                                placeholder='this@example.com'
                                autoCapitalize="off"
                                autoCorrect="off"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputs">
                            <label className="label">Password</label>
                            <Input
                                className="password"
                                type='password'
                                name='password'
                                placeholder='password'
                                autoCapitalize="off"
                                autoCorrect="off"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="cookieMessage">
                            <span className="cookie">By logging in, you agree to our use of cookies to keep you signed in and enhance your experience.</span>
                        </div>
                            
                        <span className="errorMessage"></span>
                        <button className="loginButton" type="submit"> 
                            Log In
                        </button>     
                        
                        {/* Register container */}
                        <div className="register">
                            <span className="registerNow">New here?</span>
                            <button className="signUp" onClick={handleSignUp}>
                                Sign Up!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}