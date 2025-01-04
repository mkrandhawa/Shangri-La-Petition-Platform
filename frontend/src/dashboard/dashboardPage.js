import React, {useContext} from "react";
import Header from "../navigation/header";
import Dashboard from "./dashboard";
import Footer from "../navigation/footer";
import { UserContext } from "../context/userContext";
import AccessDenied from "../notFound/accessDenied";

export default function UserDashboardPage() {

    const{userDetail} = useContext(UserContext);

  
    return (
        <>
            {userDetail.role === 'petitioner' ? (
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
