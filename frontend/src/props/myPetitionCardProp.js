import React from 'react';


export default function PetitionCard(props){

    const { image, title, description, status, createdAt, countSigns, minSign, formatDate, response } = props;

    const imageUrl = image ? `https://shangri-la-petitions-mk747-a15915868dc5.herokuapp.com/${image.replace('public', '')}` : '../images/defaultPetition.png';

    
    return (
        <>

            <div className="petitionImageContainer">
                <span 
                    className="petitionImage" 
                    style={{ backgroundImage: `url(${imageUrl})` }}
                ></span>
            </div>

            <div className="petitionDetails myPetitionsDetails">
                {/* Title */}
                <div className="details">
                    <span className="petitionTitle mySinglePetitionTitle">{title}</span>
                </div>

                {/* Description */}
                <div className="details">
                    <span className={"petitionDescription myDescription" }>{description}</span>
                </div>

                {/* Status */}
                <div className="details">
                    <span className={`myPetitonTitle ${status==='open'? 'statusIcon' : 'closeIcon'}`}></span>
                    <span className="petitionStatus">{status === 'open' ? 'Open' : 'Closed'}</span>
                </div>

                {status === 'open' && 
                <>
                    {/* Created */}
                    <div className="details">
                        <span className="myPetitonTitle dateIcon"></span>
                        <span className="petitionCreation">
                            {formatDate(createdAt)}
                        </span>
                    </div>

                    {/* Progress */}
                    <div className="details">
                        <span className="myPetitonTitle">Progress: </span>
                        <span className="signs">
                            {/* Progress Bar */}
                            <div className="progressBarContainer">
                                <div
                                    className="progressBarFill"
                                    style={{
                                        width: `${(countSigns / minSign) * 100}%`, // Calculate progress percentage
                                    }}
                                ></div>
                            </div>
                        </span>
                    </div>
                </>
                }
                


                {/* Response */}
                {status === 'closed' && 
                    <div className="details">
                        <span className="myPetitonTitle responseMyPetition">Response: </span>
                        <span className="response myResponse">
                            {response}
                        </span>
                    </div>
                
                }
                

            
            </div>

            
        </>
    );
};

