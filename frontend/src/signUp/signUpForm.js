import React, {useEffect, useState} from "react";
import Input from "../props/inputProp";


export default function SignUpForm(){

    const [user, setUser]= useState({
        fullName:'',
        email:'',
        dob:'',
        bioID:'',
        password:'',
        confirmPassword:''
    });

    const [samePassword, setSamePassword] = useState(false);


    // Handle changes in the form

    const handleChange = (event) =>{
        
        const {name, value} = event.target;

        setUser({...user, [name]:value});
    }



    // Check if the passwords are the same or less than 8 characters
    useEffect(()=>{

        console.log(user);

        let password = user.password;
        let confirmPassword = user.confirmPassword;

        if (confirmPassword !== password || password.length < 8 || confirmPassword.length < 8){
            setSamePassword(false);
        }else{
            setSamePassword(true);
        }

    }, [user]);

    return(
        <>
            <main className="homePage registerPage">
                
                <div className="signUp login">
                    {/* Form title */}
                    <div className="formTitle">Sign Up</div>
                    
                    {/* Signup form container */}
                    <div className="signUpFormContainer">

                        <form className="signUpForm">

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
                                        onChange={handleChange}


                                    />
                                </div>
                                
                                
                                {/* BIOMETRIC ID */}

                                <div className="regInputs">
                                    <label className="regLabel">BioID</label>
                                    <Input
                                        className="bioID"
                                        type='text'
                                        name='bioID'
                                        placeholder='EXAMPLE159'
                                        autoCapitalize='off'
                                        autoCorrect='off'
                                        required
                                        onChange={handleChange}


                                    />

                                </div>

                            </div>
                            
                            {/* Password and Confirm Password Container */}
                            <div className="passwordConfirmPassword">
                                 {/* PASSWORD */}
                                <div className="regInputs">
                                   
                                    <label className="regLabel">Password</label>
                                    <Input
                                        className={samePassword ? "passwordRegister" : "confirmPasswordError"}
                                        type='password'
                                        name='password'
                                        placeholder='********'
                                        autoCapitalize='off'
                                        autoCorrect='off'
                                        required
                                        onChange={handleChange}


                                    />
                                </div>

                                {/* CONFIRM PASSWORD */}
                                <div className="regInputs">
                                   
                                    <label className="regLabel">Confirm Password</label>
                                    <Input
                                        className={samePassword ? "confirmPassword" : "confirmPasswordError"}
                                        type='password'
                                        name='confirmPassword'
                                        placeholder='********'
                                        autoCapitalize='off'
                                        autoCorrect='off'
                                        required
                                        onChange={handleChange}


                                    />
                                </div>
                            
                            </div>

                            <span className="errorMessage"></span>
                            {/* Submit button */}
                            <button className="loginButton signUpButton" type="submit">
                                Sign Up
                            </button>
                            

                            
                        </form>

                    </div>
                </div>
            </main>
        </>
    )

}