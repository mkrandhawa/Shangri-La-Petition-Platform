import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Input from "../props/inputProp";
import { postData } from "../fetchRoutes/postData";


export default function LoginForm(){

    const navigate = useNavigate();

    const url = 'http://localhost:8000/api/user/auth/login'


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

    console.log('I have been triggered');

    // Async/Await to get handle the post data
    (async () => {
        try {
            const response = await postData(url, user);
            console.log(response);
            // Password and email correct --> Send the user to the Open Petitions page
            if(response.status ==='Success'){
                navigate('/'); // DO that OKAYYYYYYY
            }
            } catch (err) {
                const errorElement = document.getElementsByClassName('errorMessage')[0];
                errorElement.textContent = err.message;
            // alert("Failed to create user: " + err.message);
        }
    })();

  }

  useEffect(()=>{

    console.log(user);

  },[user])

    return (

        <main className="homePage loginPage">
            <div className="login">
                <div className="formTitle"> Log In </div>
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
                        <span className="errorMessage"></span>
                        <button className="loginButton" type="submit"> 
                            Log In
                        </button>     
                        
                        {/* Forgot password container */}
                        <div className="register">
                            <span className="registerNow">New here?</span>
                            <button className="signUp">
                                Sign Up!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}