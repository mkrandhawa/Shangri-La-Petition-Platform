import React, { useState, useRef, useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { getData } from "../../fetchRoutes/getData";
import {patchDataForm} from "../../fetchRoutes/patchDataForm";
import { UserContext } from "../../context/userContext";


export default function PetitionReply(){

    const url = process.env.REACT_APP_REACHED_THRESHOLD;

    const navigate = useNavigate();

    const {setTotPetitionToReply} = useContext(UserContext);

    const [petitions, setPetitions] = useState([]);

    const containerRef = useRef(null);

    const [message, setMessage] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    
    const [replyMessage, setReplyMessage] = useState('');

    const [disable, setDisable] = useState(false);

    const [reply, setReply] = useState({
        response:""
    });

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -containerRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: containerRef.current.clientWidth, behavior: 'smooth' });
        }
    };


    const handleChange = (event) =>{

        const {name, value} = event.target;

        setReply({...reply, [name]: value});

        console.log('I am in handle change', reply);

        // Validation rules for each field
        const rules = {
            response: { minLength: 100, maxLength: 5000 },
            
        };

        // Check if the field has validation rules
        if (rules[name]) {
            const { minLength, maxLength } = rules[name];

            if(name === 'response'){
                // Validate length
                if (value.length > maxLength) {
                    setReplyMessage(`${name} must not exceed ${maxLength} characters.`);
                    setDisable(true);

                }else if (value.length < minLength) {
                    setReplyMessage(`${name} must be at least ${minLength} characters long.`);
                    setDisable(true);

                }else {
                    // Clear the message when valid
                    setReplyMessage('');
                    setDisable(false);
                }

            }

        }

    }

    // Reply Petition that have met the threshold
    const handleSubmit = (event, id) =>{

        event.preventDefault();

        const patchUrl =  `${process.env.REACT_APP_REPLY_PETITION}${id}/respond`;

        if(!reply){

            return console.log('There is no reply set yet')

        }

        const patchPetition = async()=>{
            try{
                const res = await patchDataForm(patchUrl, { response: reply.response });

                console.log(res);
                console.log('Status: ', res.status);
                if(res.status==='Success'){

                    setSuccessMessage(res.message);
                    setTimeout(() => {
                        navigate('/adminDashboard');
                    }, 2000); 
                    setTotPetitionToReply((prev)=> prev-1);
                    setReply({response: ""});

                    

                }

                if (res.status==='Fail'){
                    setMessage(res.message);
                    setTimeout(() => {
                        setMessage("");  
                    }, 2000); 
                }

            }catch(error){

                if (error.message) {
                    
                    setMessage(error.message); 

                    setTimeout(() => {
                        setMessage("");  
                    }, 1000); 
                } 
            }

        }
        patchPetition();
    }



    //Fetch petitions that reached the threshold
    useEffect(() => {
        const fetchPetitions = async () => {
            if (!url) return;
            try {
                const response = await getData(url);
                if (response.status === 'Success') {

                    if(response.data){
                        setPetitions(response.data);
                        setTotPetitionToReply(response.data.length);
                    }

                }
            } catch (err) {
                console.error('Error fetching petitions:', err);
            } 
        };
        fetchPetitions();
    },[url, setTotPetitionToReply]);



    


    return(
        <>
            {petitions.length==='undefined'? (
                <span> No pretiions Available</span>
            ):(

                <> 
                <div className={petitions.length===1? 'onePetition':'petitionsPage'}>
                {petitions.length === 0 ? 'No petitions reached the threshold!' : (

                    <>

                        <div className='arrows'>
                            <div className="arrow leftArrow" onClick={scrollLeft}>&#9664;</div>
                            <div className="arrow rightArrow" onClick={scrollRight}>&#9654;</div>
                        </div>


                        <div className='petitionsContainer petitionsToReply' ref={containerRef}>
                            {petitions.map((petition, index) => (
                              
                                <div className="onePetitionsCard petitionToReplyOneCard"key={index} 
                                    style={{ backgroundImage: `url(https://shangri-la-petitions-mk747-a15915868dc5.herokuapp.com/${petition.image.replace('public', '')})` }}>
                                    
                                    <div className="petitionDetails allPetitionsDetails">
                                        <div className="details petitionsDetails">
                                            <span className="petitionTitle">{petition.title}</span>
                                        </div>
                                        <div className="details">
                                            <span className="petitionDescription replyPetitionDescription">{petition.text}</span>
                                        </div>

                                        {petition.status==='open' &&
                                            <>
                                                <div className="details">
                                                    <span className="myPetitonTitle">Progress: </span>
                                                    <span className="signs">
                                                        <div className="progressBarContainer">
                                                            <div
                                                                className="progressBarFill"
                                                                style={{
                                                                    width: `${(petition.countSigns / petition.minSign) * 100}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </>
                                        }

                                        {/* Response */}
                                        <>  
                                            <form className="replyform" onSubmit={(event) => handleSubmit(event,petition._id)}>
                                                <div className="regInputsEmail replyInput">
                                                    <label className="regLabel replyLabel">Reply
                                                        <span className="errorMessage addPetitionError">
                                                            {replyMessage}
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        className="emailRegister addDescription addReply"
                                                        type='text'
                                                        name='response'
                                                        placeholder='In reply .....'
                                                        autoCapitalize="off"
                                                        autoCorrect="off"
                                                        required
                                                        maxLength={5000}
                                                        minLength={100}
                                                        value={reply.response}
                                                        onChange={handleChange}
                                                    
                                                    />

                                                </div>

                                                <div className="message">
                                                    <span className={  successMessage.length>1 ? 'successMessage': 'signMessage'}>
                                                        {successMessage.length > 1 ? successMessage : message}
                                                    </span>  
                                                </div>

                                                {/* Submit button */}

                                                <div className="button">

                                                    <button className="loginButton signUpButton addReplyButton" type="submit" disabled={disable}>
                                                        Add Reply
                                                    </button>  

                                                   

                                                </div>            


                                            </form> 
                                        </>
                                        
                                    </div>
                                </div>  
                            ))}
                        </div>
                    
                    </>


                )}

            </div>
                </>
            )}


        </>
    )
}