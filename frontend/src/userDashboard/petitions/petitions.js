import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { getData } from '../../fetchRoutes/getData';
import { patchData } from '../../fetchRoutes/patchData';


export default function Petition() {

    const [url, setUrl] = useState('');
    const [petitions, setPetitions] = useState([]);
    const { totPetition, setTotPetition } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const containerRef = useRef(null);
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = String(date.getDate()).padStart(2, '0');
        return `${day} ${month}`;
    };

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

    const handleClick = (id) =>{
        const patchUrl =  `${process.env.REACT_APP_PATCH_URL}${id}/sign`;
        const patchPetition = async()=>{
        try{
            const response = await patchData(patchUrl);

            if (response.status==='Fail'){
                 setMessage(response.message);
                setTimeout(() => {
                    setMessage("");  
                }, 1000); 
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

     // Update URL based on the status query parameter
    useEffect(() => {
        if (status === 'open') {

            setUrl(process.env.REACT_APP_GET_OPEN_PETITIONS);

        } else if (status === 'closed') {

            setUrl(process.env.REACT_APP_GET_CLOSED_PETITIONS);

        } else {

            setUrl(process.env.REACT_APP_GET_PETITIONS);
        }
    }, [status]);
    
    // Fetch Data
    useEffect(() => {
        const fetchPetitions = async () => {
            if (!url) return;
            try {

                const response = await getData(url);
                if (response.status === 'Success') {
                    setPetitions(response.data);
                }
            } catch (err) {
                console.error('Error fetching petitions:', err);
            }
        };
        fetchPetitions();
    },[url]);

    // Calculate Petition Length
    useEffect(() => {
        if (Array.isArray(petitions)) {
            const petitionCount = petitions.length;
            if (petitionCount !== totPetition) {
                setTotPetition(petitionCount);
            }
        }
    }, [petitions, totPetition, setTotPetition]);

   
    return (
        <>
            <div className={petitions.length===1? 'onePetition':'petitionsPage'}>
                {petitions.length === 0 ? 'There are no petitions at the moment' : (
                    <>
                        <div className='arrows'>
                            <div className="arrow leftArrow" onClick={scrollLeft}>&#9664;</div>
                            <div className="arrow rightArrow" onClick={scrollRight}>&#9654;</div>
                        </div>
                        <div className='petitionsContainer' ref={containerRef}>
                            {petitions.map((petition, index) => (
                              
                                <div className="onePetitionsCard"key={index}>
                                    
                                    <div className="petitionDetails allPetitionsDetails">
                                        <div className="details petitionsDetails">
                                            <span className="petitionTitle">{petition.title}</span>
                                        </div>
                                        <div className="details">
                                            <span className="petitionDescription">{petition.text}</span>
                                        </div>
                                        <div className="details">
                                            <span className={`myPetitonTitle ${petition.status === 'open' ? 'statusIcon' : 'closeIcon'}`}></span>
                                            <span className={petition.status==='closed' ? "petitonStatus isClosed":"petitionStatus"}>{petition.status === 'open' ? 'Open' : 'Closed'}</span>
                                        </div>
                                        <div className="details">
                                            <span className="myPetitonTitle dateIcon"></span>
                                            <span className="petitionCreation">
                                                {formatDate(petition.createdAt)}
                                            </span>
                                        </div>
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

                                        {/* Sign Button */}
                                        {petition.status==='open' && 
                                            <>
                                                <div className='details signButton'>
                                                
                                                    <button className='signPetitionButton' onClick={()=>handleClick(petition._id)}>
                                                        Sign Petitions
                                                    </button>
                                                    <span className='signMessage'>{setMessage ? message : ''}</span>
                                                </div>   
                                                
                                                
                                            </>

                                        }

                                    </div>
                                </div>  
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}