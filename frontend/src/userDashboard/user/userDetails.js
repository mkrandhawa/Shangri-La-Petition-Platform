import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/userContext";


export default function UserDetails() {

    const { userDetail } = useContext(UserContext);

    const [age, setAge] = useState();

    const calculateAge = () => {

        const dob = new Date(userDetail.dob);
        const today = new Date();
        const age = today.getUTCFullYear() - dob.getUTCFullYear();

        setAge(age);
    }   

    useEffect(() => {

        if (userDetail?.dob) {
            calculateAge();
          }

    });

    return (
        <>
            <div className="userDetailsCard">

                {/* User Card Detail */}
                <div className="userCard">

                    <div className="userImage">
                        <span className="image"></span>
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

                    {/* Upload Picture */}
                    <div className="uplaodContainer">
                        <div className="uploadProfilePicture">
                            <button className="uploadPicture" type="submit">
                                Upload Profile Picture
                            </button>
                        </div>
                        <span className="fileName"></span>
                    </div>
                </div>

                {/* Petition Details */}
                <div className="myPetitionDetailCard">

                    <div className="myPetitionContainer">
                        <span className="mytitle">Created</span>
                        <span className="number">{userDetail.createdPetitions.length}</span>
                    </div>

                    <div className="myPetitionContainer">
                        <span className="mytitle">Signed</span>
                        <span className="number">{userDetail.signedPetitions.length}</span>
                    </div>
                </div>
            </div>
        </>
    )
}