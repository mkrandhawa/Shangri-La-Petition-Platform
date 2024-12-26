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

                        <div className={petition.status === 'closed' ? "myPetitionsCard closed": "myPetitionsCard" }key={index}>

                            <div className="petitionImageContainer">
                                <span className="petitionImage"></span>
                            </div>

                            <div className="petitionDetails">
                                {/* Title */}
                                <div className="details">
                                    <span className="petitionTitle">
                                        {petition.title}
                                    </span>
                                </div>

                                {/* Description */}
                                <div className="details">
                                    <span className="petitionDescription">
                                        {petition.text}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="details">
                                    <span className="myPetitonTitle">Status: </span>
                                    <span className="petitionStatus">
                                        {petition.status}
                                    </span>
                                </div>

                                {/* Created */}
                                <div className="details">
                                    <span className="myPetitonTitle">Created On: </span>
                                    <span className="petitionCreation">  
                                        {formatDate(petition.createdAt)}
                                    </span>
                                </div>

                                {/* Progress */}
                                <div className="details">
                                    <span className="myPetitonTitle">Signs: </span>
                                    <span className="signs">
                                        {petition.countSigns}/{petition.minSign}
                                    </span>
                                </div>

                                
                            </div>
                                    
                            
                        </div>

                    ))
                
                )
                
                }
            </div>
            
        </>
    )
}