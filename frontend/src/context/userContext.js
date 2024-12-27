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
    });

    const [totPetition, setTotPetition] = useState(0);

    

    return(
        <UserContext.Provider value={{userDetail, setUserDetail, isLogged, setIsLogged, totPetition, setTotPetition}}>
            {props.children}
        </UserContext.Provider>
    )
}