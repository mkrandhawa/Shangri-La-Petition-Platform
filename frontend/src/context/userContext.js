import React, {createContext, useState} from "react";

export const UserContext = createContext();

export default function UserProvider(props){

    const [isLogged, setIsLogged] = useState(false);

    const [userDetail, setUserDetail] = useState({
        fullName:'',
        email:''
    });

    return(
        <UserContext.Provider value={{userDetail, setUserDetail, isLogged, setIsLogged}}>
            {props.children}
        </UserContext.Provider>
    )
}