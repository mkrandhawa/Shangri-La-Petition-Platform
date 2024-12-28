import React from 'react';


export default function PetitionCard(props){

    const { image, title, description, status, createdAt, countSigns, minSign, formatDate } = props;
    
    return (
        <>

            <div className="petitionImageContainer">
                <span 
                    className="petitionImage" 
                    style={{ backgroundImage: `url(http://localhost:8000/${image.replace('public', '')})` }}
                ></span>
            </div>

            <div className="petitionDetails">
                {/* Title */}
                <div className="details">
                    <span className="petitionTitle">{title}</span>
                </div>

                {/* Description */}
                <div className="details">
                    <span className="petitionDescription">{description}</span>
                </div>

                {/* Status */}
                <div className="details">
                    <span className={`myPetitonTitle ${status==='open'? 'statusIcon' : 'closeIcon'}`}></span>
                    <span className="petitionStatus">{status === 'open' ? 'Open' : 'Closed'}</span>
                </div>

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
            
            </div>

            
        </>
    );
};

