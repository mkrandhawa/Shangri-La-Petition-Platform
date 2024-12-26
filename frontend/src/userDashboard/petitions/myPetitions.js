import React, {useContext} from "react";
import { UserContext } from "../../context/userContext";



export default function MyPetitions(){

    const {userDetail} = useContext(UserContext);

    const myPetitions = userDetail.createdPetitions;

    const formatDate = (dateString) => { 
        const date = new Date(dateString); 
        const month = date.toLocaleString('default', { month: 'long' });
        const day = String(date.getDate()).padStart(2, '0');
        return `${day} ${month}`;
    }
    

    console.log(myPetitions)

    return(
        <>
            <div className="myPetitionPage">
                {myPetitions.length === 0 ? 'You have not created any petition': (


                    // Create a card for each petition
                    myPetitions.map((petition, index)=>(

                        <div className="myPetitionsCard" key={index}>
                            
                            <div className="petitionImageContainer">
                                <span className="petitionImage"></span>
                            </div>

                            <div className="petionDetails">
                                <span className="petitionTitle">
                                    {petition.title}
                                </span>

                                <span className="petitionDescription">
                                    {petition.text}
                                </span>

                                <span className="petitionStatus">
                                    {petition.status}
                                </span>

                                <span className="petitionCreation"> Created on:  
                                    {formatDate(petition.createdAt)}
                                </span>

                                <span className="signs"> Signs:
                                    {petition.countSigns}/{petition.minSign}
                                </span>

                                
                            </div>
                                    
                            
                        </div>

                    ))
                
                )
                
                }
            </div>
            
        </>
    )
}