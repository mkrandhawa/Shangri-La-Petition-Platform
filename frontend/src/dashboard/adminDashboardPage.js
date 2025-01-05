import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Header from "../navigation/header";
import Footer from "../navigation/footer";
import AdminDashboard from "./adminDashboard";
import { UserContext } from "../context/userContext";
import AccessDenied from "../notFound/accessDenied";


export default function AdminDashboardPage() {

    const {userDetail} = useContext(UserContext);

    const location = useLocation(); 

    const skipValidation = location.pathname === '/slpp/petitions';
  
    return (
        <>  
            {userDetail.role === 'admin' || skipValidation ? (
                <>
                    <Header />
                    <AdminDashboard />
                    <Footer />
                </>
            ):(
                
                <AccessDenied />
              
            )}

        </>
    )
}
