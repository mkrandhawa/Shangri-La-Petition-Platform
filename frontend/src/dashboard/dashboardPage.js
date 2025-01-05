import React, {useContext} from "react";
import { useLocation } from "react-router-dom";
import Header from "../navigation/header";
import Dashboard from "./dashboard";
import Footer from "../navigation/footer";
import { UserContext } from "../context/userContext";
import AccessDenied from "../notFound/accessDenied";

export default function UserDashboardPage() {

    const{userDetail} = useContext(UserContext);

    const location = useLocation(); 

    const skipValidation = location.pathname === '/slpp/petitions';


  
    return (
        <>
            {userDetail.role === 'petitioner' || skipValidation ? (
                <>
                    <Header />
                    <Dashboard />
                    <Footer />
                </>
            ):(
                <AccessDenied />
            )}
        </>
    )
}
