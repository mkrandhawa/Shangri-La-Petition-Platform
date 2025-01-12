import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Input from '../../props/inputProp';
import { patchDataForm } from "../../fetchRoutes/patchDataForm";


export default function AddThresholdForm(){


    const url = process.env.REACT_APP_UPDATE_THRESHOLD;

    const navigate = useNavigate();

    const [successMessage, setSuccessMessage] = useState('');

    const [message, setMessage] = useState('');

    const [disable, setDisable] = useState(false);


    const [threshold, setThreshold] = useState({
        minSign:0
    });



    const handleChange = (event)=>{
        const {name, value} = event.target;

        setThreshold({...threshold, [name]:value});

        
    }

    useEffect(()=>{
        if(threshold.minSign <=0){
            setMessage('Please set a threshold above 0!');
            setDisable(true);
        }else{
            setMessage('');
            setDisable(false);
        }
    }, [threshold.minSign]);


    const handleSubmit = async (event)=>{
        event.preventDefault();

         try{
                const res = await patchDataForm(url, { minSign: threshold.minSign });

                console.log(res);
                if(res.status==='Success'){

                    setSuccessMessage(res.message);
                    setTimeout(() => {
                        navigate('/adminDashboard');
                        setSuccessMessage("");  
                    }, 1000);  

                }

                if (res.status==='Fail'){
                    setMessage(res.message);
                    setTimeout(() => {
                        setMessage("");  
                    }, 1000); 
                }

            }catch(error){
                console.log(error);

                if (error.message) {
                    
                    setMessage(error.message); 

                    setTimeout(() => {
                        setMessage("");  
                    }, 1000); 
                } 
            }
    }



    return(

        <main className="homePage registerPage addPetitionPage addThresholdPage">
        
            <div className="signUpContainer login setThreshold">
            
                {/* Company Logo  */}

                <div className="signUpLogoContainer">
                    <span className="signUpLogo"></span>

                    {/* Form Title */}
                    <div className="formTitle"> Update Threshold</div>
                    </div>

            
                {/* Signup form container */}
                <div className="signUpFormContainer setThreshold">

                    <form className="signUpForm petitionForm" onSubmit={handleSubmit}>

                        {/* PETITION THRESHOLD */}

                            <div className="fullNameEmail petitionTitle addPetitionTitle">

                                <div className="regInputsFullName">
                                    <label className="regLabel">Threshold </label>
                                    <Input
                                        className="fullName addTitle addThresholdLength"
                                        type='number'
                                        name='minSign'
                                        placeholder='5'
                                        autoCapitalize='off'
                                        autoCorrect='off'
                                        required
                                        value={threshold.minSign}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>
                        
                        <div className="message">
                            <span className={  successMessage.length>1 ? 'successMessage': 'signMessage'}>
                                {successMessage.length > 1 ? successMessage : message}
                            </span>  
                        </div>

                        {/* Submit button */}
                        <button className="loginButton signUpButton" type="submit" disabled={disable}>
                            Add Threshold
                        </button>

                        <div className="cookieMessage">
                            <span className="cookie">By adding threshold, you agree to change the threshold of all the open petitions.</span>
                        </div>

                    </form>

                </div>
            </div>
        </main>

      
    )
}