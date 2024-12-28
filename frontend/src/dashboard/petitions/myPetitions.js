import React, {useContext} from "react";
import { UserContext } from "../../context/userContext";
import PetitionCard from '../../props/myPetitionCardProp';



export default function MyPetitions(){

    const {userDetail} = useContext(UserContext);

    const myPetitions = userDetail.createdPetitions;

    const formatDate = (dateString) => { 
        const date = new Date(dateString); 
        const month = date.toLocaleString('default', { month: 'long' });
        const day = String(date.getDate()).padStart(2, '0');
        return `${day} ${month}`;
    }
    
    return(
        <>
            <div className="myPetitionPage">
                
                {myPetitions.length === 0 ? 'You have not created any petition': (


                    // Create a card for each petition
                    myPetitions.map((petition, index)=>(

                        <div className="myPetitionsCard" key={index}>

                            {petition.status === 'closed' ?(
                                <PetitionCard
                                    key={index}
                                    image={petition.image}
                                    title={petition.title}
                                    description={petition.text}
                                    status={petition.status}
                                    createdAt={petition.createdAt}
                                    countSigns={petition.countSigns}
                                    minSign={petition.minSign}
                                    formatDate={formatDate} 
                                    response={petition.response}
                                />
                            ):(
                                <PetitionCard
                                    key={index}
                                    image={petition.image}
                                    title={petition.title}
                                    description={petition.text}
                                    status={petition.status}
                                    createdAt={petition.createdAt}
                                    countSigns={petition.countSigns}
                                    minSign={petition.minSign}
                                    formatDate={formatDate} 
                                />
                            )
                            
                            
                            }
                            
                        </div>

                    ))
                
                )
                
                }
            </div>
            
        </>
    )
}