import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import QrReader from 'react-qr-scanner';
import Input from "../props/inputProp";
import { postData } from "../fetchRoutes/postData";
import { UserContext } from "../context/userContext";



export default function SignUpForm(){

    const url = process.env.REACT_APP_SIGNUP_URL;

    const [user, setUser]= useState({
        fullName:'',
        email:'',
        dob:'',
        bioId:'',
        password:'',
        confirmPassword:''
    });

    const {setUserDetail, setIsLogged} = useContext(UserContext);

    const navigate = useNavigate();

    const [samePassword, setSamePassword] = useState(true);

    const [scanning, setScanning] = useState(false); 

    const [message, setMessage] = useState('');
    
    const handleScan = (data) => { 
        if (data) { 
            setUser({ ...user, bioId: data.text }); 
            setScanning(false); 
        } 
    } 
    
    const handleError = (err) => { console.error(err); }


    // Handle changes in the form

    const handleChange = (event) =>{
        
        const {name, value} = event.target;

        setUser({...user, [name]:value});
    }

    // Hanle Log In

    const handleLogIn = () =>{
        navigate('/login');
    }

    // Handle Form Submit 

    const handleSubmit = async (event) =>{

        event.preventDefault();

        try{

            const response = await postData(url, user);

            if(response.status === 'success'){
                navigate('/');
                await setUserDetail({
                    fullName: user.fullName,
                    email: user.email
                });
                setIsLogged(true);
            }

        }catch(err){
            setMessage(err.message);
            // const errorElement = document.getElementsByClassName('errorMessage')[0];
            // errorElement.textContent = err.message;
        }
    }

    //Handle Scanner for Biometric ID
    const handleScanner = () => { 
        setScanning(true);
    }

    // Check if the passwords are the same or less than 8 characters
    useEffect(()=>{

        let password = user.password;
        let confirmPassword = user.confirmPassword;

        if(password.length === 0 && confirmPassword.length === 0){
            setSamePassword(true);
        }
        else if (confirmPassword !== password || password.length < 8 || confirmPassword.length < 8){
            setSamePassword(false);
        }else{
            setSamePassword(true);
        }

    }, [user]);

    return(
        <>
            <main className="homePage registerPage">
                
                <div className="signUpContainer login">

                    {/* Company Logo  */}

                    <div className="signUpLogoContainer">
                        <span className="signUpLogo"></span>
                        {/* Form Title */}
                        <div className="formTitle"> Sign Up </div>
                     </div>

                    
                    
                    {/* Signup form container */}
                    <div className="signUpFormContainer">

                        <form className="signUpForm" onSubmit={handleSubmit}>

                            {/* Full Name and Email container */}

                            <div className="fullNameEmail">
                                {/* FULL NAME */}
                                <div className="regInputsFullName">
                                    <label className="regLabel">Name</label>
                                    <Input
                                        className="fullName"
                                        type='text'
                                        name='fullName'
                                        placeholder='John Anderson'
                                        autoCapitalize='off'
                                        autoCorrect='off'
                                        required
                                        value={user.fullName}
                                        onChange={handleChange}

                                    />

                                </div>

                                {/* EMAIL */}
                                <div className="regInputsEmail">
                                    <label className="regLabel">Email</label>
                                    <Input
                                        className="emailRegister"
                                        type='email'
                                        name='email'
                                        placeholder='this@example.com'
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        required
                                        value={user.email}
                                        onChange={handleChange}

                                    />
                                </div>
                            </div>
                            
                            {/* Date of Birth and Biometric ID container */}
                            
                            <div className="dobBioId">

                                {/* DOB */}
                                <div className='regInputs'>
                                    
                                    <label className="regLabel">DOB</label>
                                    <Input
                                        className="dob"
                                        type='date'
                                        name='dob'
                                        placeholder='01/01/2000'
                                        autoCapitalize='off'
                                        autoCorrect='off'
                                        required
                                        value={user.dob}
                                        onChange={handleChange}
                                    />
                                </div>
                                
                                
                                {/* BIOMETRIC ID */}

                                <div className="regInputs">
                                    <label className="regLabel">BioID</label>

                                    <div className="inputAndIcon">
                                        <Input
                                            className="bioID"
                                            type='text'
                                            name='bioId'
                                            placeholder='EXAMPLE159'
                                            autoCapitalize='off'
                                            autoCorrect='off'
                                            required
                                            value={user.bioId}
                                            onChange={handleChange}
                                        />
                                        <span className="cameraIcon" onClick={handleScanner}></span>
                                    </div>

                                    {/* Display QR reader when scanning */}
                                    { 
                                        scanning && ( 
                                            <div className="modal"> 
                                                <div className="modalContent"> 
                                                    <button 
                                                        className="closeButton" 
                                                        onClick={() => setScanning(false)}
                                                    >
                                                        X
                                                    </button>
                                                    
                                                    <QrReader 
                                                        delay={200} 
                                                        onError={handleError} 
                                                        onScan={handleScan} 
                                                        style={{ width: '100%' }} 
                                                    /> 
                                                </div> 
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                            
                            {/* Password and Confirm Password Container */}
                            <div className="passwordConfirmPassword">
                                 {/* PASSWORD */}
                                <div className="regInputs">
                                   
                                    <label className="regLabel">Password</label>
                                    <Input
                                        className={samePassword ? "passwordRegister" : "passwordRegister error"}
                                        type='password'
                                        name='password'
                                        placeholder='********'
                                        autoCapitalize='off'
                                        autoCorrect='off'
                                        required
                                        value={user.password}
                                        onChange={handleChange}


                                    />
                                </div>

                                {/* CONFIRM PASSWORD */}
                                <div className="regInputs">
                                   
                                    <label className="regLabel">Confirm Password</label>
                                    <Input
                                        className={samePassword ? "confirmPassword" : "confirmPassword error"}
                                        type='password'
                                        name='confirmPassword'
                                        placeholder='********'
                                        autoCapitalize='off'
                                        autoCorrect='off'
                                        required
                                        value={user.confirmPassword}
                                        onChange={handleChange}


                                    />
                                </div>
                            
                            </div>

                            <span className="errorMessage">{message}</span>

                            {/* Submit button */}
                            <button className="loginButton signUpButton" type="submit">
                                Sign Up
                            </button>

                            <div className="cookieMessage">
                                <span className="cookie">By registering, you agree to our use of cookies to keep you signed in and enhance your experience.</span>
                            </div>

                            {/* Alredy Registered */}
                            <div className="register">
                                <span className="registerNow loginNow">Already Registered? </span>
                                <button className="signUp logIn" onClick={handleLogIn}>
                                    Log In!
                                </button>
                            </div>
                            

                            
                        </form>

                    </div>
                </div>
            </main>
        </>
    )

}