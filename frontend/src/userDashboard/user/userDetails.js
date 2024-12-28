import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/userContext";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default function UserDetails() {

    const { userDetail, loading } = useContext(UserContext);

    const [age, setAge] = useState();

    const [openPetitions, setOpenPetitions] = useState(0);

    const [closedPetitions, setClosedPetitions] = useState(0);


    //Calculate user Ager
    const calculateAge = () => {

        const dob = new Date(userDetail.dob);
        const today = new Date();
        const age = today.getUTCFullYear() - dob.getUTCFullYear();

        setAge(age);
    }   

    // Count total petitions
    const countPetitions = () => {
        const open = userDetail.createdPetitions.filter(petition => petition.status === 'open').length;
        const closed = userDetail.createdPetitions.filter(petition => petition.status === 'closed').length;
    
        setOpenPetitions(open);
        setClosedPetitions(closed); 
    }


    useEffect(() => {

        if (userDetail?.dob) {
            calculateAge();
          
        }

        if(userDetail?.createdPetitions){

            countPetitions();
        }

    }, [userDetail]);


    
    return (
        <>
            {loading ? (
                // Show loading indicator
                <div className="loading">
                    <span>Loading user details...</span>
                </div>
            ) : (
            <div className="userDetailsCard">

                {/* User Card Detail */}
                <div className="userCard">

                    <div className="userImage">
                        <span className="image"
                            style={{ backgroundImage: `url(http://localhost:8000/${userDetail.image.replace('public', '')})` }}
                        ></span>
                    </div>

                    <div className="userDetails">


                        <div className="myNameDetails">
                            <span className="title">Name: </span>
                            <span className="myName">{userDetail.fullName}</span>
                        </div>


                        <div className="myEmailsDetails">
                            <span className="title">Email: </span>
                            <span className="myEmail">{userDetail.email}</span>
                        </div>


                        <div className="myAgeDetails">
                            <span className="title">Age: </span>
                            <span className="myAge">{age}</span>
                        </div>
                    </div>

                    {/* My Role */}
                    <div className="roleContainer"> 
                        <span className="role"> {userDetail.role}</span>
                    </div>

                </div>

                {/* Petition Details */}

                <div className="myPetitionDetailCard">

                    <div className="containerLeft">

                        <div className="myPetitionContainer">
                            <CircularProgressbar
                                value={userDetail.createdPetitions?.length}
                                maxValue={userDetail.createdPetitions?.length}
                                text={`${userDetail.createdPetitions?.length}`}
                                styles={buildStyles({
                                    textColor: '#006400',
                                    pathColor: 'green',
                                    trailColor: '#f4f4f4'
                                })}
                            />
                            <span className="mytitle">Created</span>
                        </div>

                        <div className="myPetitionContainer">
                            <CircularProgressbar
                                value={userDetail?.signedPetitions?.length}
                                maxValue={userDetail?.createdPetitions?.length}
                                text={`${userDetail?.signedPetitions?.length}`}
                                styles={buildStyles({
                                    textColor: '#006400',
                                    pathColor: 'green',
                                    trailColor: '#f4f4f4'
                                })}
                            />
                            <span className="mytitle">Signed</span>
                        </div>
                    </div>

                    <div className="containerRight">

                        <div className="myPetitionContainer">
                            <CircularProgressbar
                                value={openPetitions}
                                maxValue={userDetail.createdPetitions?.length}
                                text={`${openPetitions}`}
                                styles={buildStyles({
                                    textColor: '#006400',
                                    pathColor: 'green',
                                    trailColor: '#f4f4f4'
                                })}
                            />
                            <span className="mytitle">Open</span>
                        </div>

                        <div className="myPetitionContainer">
                            <CircularProgressbar
                                value={closedPetitions}
                                maxValue={userDetail.createdPetitions?.length}
                                text={`${closedPetitions}`}
                                styles={buildStyles({
                                    textColor: '#006400',
                                    pathColor: 'green',
                                    trailColor: '#f4f4f4'
                                })}
                            />
                            <span className="mytitle">Closed</span>
                        </div>
                    </div>

                </div>

            </div>
            )}
        </>
    )
}