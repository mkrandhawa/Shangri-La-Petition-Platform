import React, {useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../../context/userContext";
import Input from "../../props/inputProp";
import {postDataForm} from "../../fetchRoutes/postDataForm";


export default function AddPetitionForm(){

    const url = process.env.REACT_APP_ADDPETITION_URL;

    const [addMyPetition, setAddMyPetition] = useState({
        title:'',
        text:'',
    });

    const navigate = useNavigate();

    const [previewUrl, setPreviewUrl] = useState(null);

    const [titleMessage, setTitleMessage] = useState(''); 

    const [descriptionMessage, setDescriptionMessage] = useState(''); 

    const [message, setMessage] = useState('');

    const {updateUserDetail } = useContext(UserContext);

    // Handle Image Upload
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {

                setPreviewUrl(reader.result);
                // Update the form state with the selected image file
                setAddMyPetition({ ...addMyPetition, image: file });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle Field Changes
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        // Validation rules for each field
        const rules = {
            title: { minLength: 3, maxLength: 100 },
            text: { minLength: 500, maxLength: 5000 },
        };
    
        // Check if the field has validation rules
        if (rules[name]) {
            const { minLength, maxLength } = rules[name];

            if(name === 'title'){
                // Validate length
                if (value.length > maxLength) {
                    setTitleMessage(`${name} must not exceed ${maxLength} characters.`);

                }else if (value.length < minLength) {
                    setTitleMessage(`${name} must be at least ${minLength} characters long.`);

                }else {
                    // Clear the message when valid
                    setTitleMessage('');
                }

            }else if(name ==='text'){

                // Validate length
                if (value.length > maxLength) {
                    setDescriptionMessage(`Description must not exceed ${maxLength} characters.`);

                }else if (value.length < minLength) {
                    setDescriptionMessage(`Description must be at least ${minLength} characters long.`);

                }else {
                    // Clear the message when valid
                    setDescriptionMessage('');
                }
            }
        }
    
        // Update state
        setAddMyPetition({ ...addMyPetition, [name]: value });
    }

     // Handle Form Submit 
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = new FormData();

        formData.append("title", addMyPetition.title);
        formData.append("text", addMyPetition.text);


        
        if (addMyPetition.image) {
            formData.append('image', addMyPetition.image); 
        }

        try {
            
            const response = await postDataForm(url, formData);

            
            if (response.status === 'Success') {

                updateUserDetail(response.data);

                navigate('/slpp/petitions');
            } else {
                
                setMessage('Failed to submit petition: ' + response.message || 'Unknown error');
            }
        } catch (err) {
            
            setMessage('Something went wrong');
            
        }
    }
    


    return(
        <>
            <main className="homePage registerPage addPetitionPage">

                 <div className="signUpContainer login addPetition">
                
                    {/* Company Logo  */}

                    <div className="signUpLogoContainer">
                        <span className="signUpLogo"></span>

                        {/* Form Title */}
                        <div className="formTitle"> Add Petition </div>
                        </div>

                
                    {/* Signup form container */}
                    <div className="signUpFormContainer addPetitionFormContainer">

                        <form className="signUpForm petitionForm" onSubmit={handleSubmit}>

                            {/* TITLE AND TEXT CONTAINER */}

                            <section className="formWithImageUploader">

                                <div className="fullNameEmail petitionTitle">

                                    {/* PETITION TITLE */}
                                    <div className="regInputsFullName">
                                        <label className="regLabel">Title  
                                            <span className="errorMessage addPetitionError">
                                                {titleMessage}
                                            </span>
                                        </label>
                                        <Input
                                            className="fullName addTitle"
                                            type='text'
                                            name='title'
                                            placeholder='Shangri-La Petition'
                                            autoCapitalize='off'
                                            autoCorrect='off'
                                            minLength={3}
                                            maxLength={100}
                                            required
                                            value={addMyPetition.title}
                                            onChange={handleChange}
                                            

                                        />

                                    </div>

                                    {/* PETITION DESCRIPTION */}
                                    <div className="regInputsEmail">
                                        <label className="regLabel">Description
                                            <span className="errorMessage addPetitionError">
                                                {descriptionMessage}
                                            </span>
                                        </label>
                                        <textarea
                                            className="emailRegister addDescription"
                                            type='text'
                                            name='text'
                                            placeholder='This petition is for...'
                                            autoCapitalize="off"
                                            autoCorrect="off"
                                            required
                                            maxLength={5000}
                                            minLength={500}
                                            value={addMyPetition.text}
                                            onChange={handleChange}
                                        
                                        />

                                      
                                    </div>
                                </div>

                                {/* IMAGE UPLOADER */}

                                <div className="fullNameEmail form-section">
                                    
                                    {/* PETITION IMAGE */}
                                    <div className="regInputsEmail imageInput">
                                        
                                        <div className="imageViewWindow">
                                            {previewUrl ? (
                                                <div className="image-preview">
                                                    <img src={previewUrl} alt="Selected preview" />
                                                </div>
                                            ) : (
                                                <span className="userUploadImage">No image selected</span>
                                            )}
                                        </div>

                                        <div className="uploadButton">

                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="image-upload-input"
                                                name="image"
                                                onChange={handleImageChange}
                                            /> 

                                            <p className="upload-instructions">
                                                Choose an image file (ex. PNG, JPG). Max size: 5MB.
                                            </p>

                                        </div>
                                        
                                    </div>
                                </div>

                            </section>

                            {/* Submit button */}
                            <button className="loginButton signUpButton addPetitionButton" type="submit">
                                Add Petition
                            </button>

                            <div className="cookieMessage">
                                <span className="cookie">By adding petition, you agree to share your petition to other people.</span>
                                <span className="erroMessage uploadErroMessage">{message}</span>
                            </div>

                            
                            
                        </form>

                    </div>
                </div>

            </main>

        </>
    )

}