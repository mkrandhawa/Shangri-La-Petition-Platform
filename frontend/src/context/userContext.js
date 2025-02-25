import React, {createContext, useState} from "react";

export const UserContext = createContext();

export default function UserProvider(props){

    const [isLogged, setIsLogged] = useState(false);

    const [userDetail, setUserDetail] = useState({
        fullName:'',
        email:'',
        dob:'',
        createdPetitions:[],
        signedPetitions:[],
        role:'',
        image:''
    });

    const [totPetition, setTotPetition] = useState(0);

    const [totPetitionToReply, setTotPetitionToReply] = useState(0);

    const [loading, setLoading] = useState(true);

    const[isTouched, setIsTouched] = useState(false);

    const handleTouch = () => {
        setIsTouched(prev => !prev);
    };


    const updateUserDetail = (newDetail) => {
        setUserDetail(prevState => ({
            ...prevState,
            createdPetitions: [
                ...(prevState.createdPetitions || []), // If createdPetitions is undefined, use an empty array
                newDetail
            ]
        }));
    };
    

    

    return(
        <UserContext.Provider value={{
            userDetail, 
            setUserDetail, 
            isLogged, 
            setIsLogged, 
            totPetition, 
            setTotPetition, 
            loading, 
            setLoading, 
            updateUserDetail,
            totPetitionToReply, 
            setTotPetitionToReply,
            isTouched,
            setIsTouched,
            handleTouch

            }}
            >
            {props.children}
        </UserContext.Provider>
    )
}