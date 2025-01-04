import React, { useContext } from "react";
import Header from "../navigation/header";
import Footer from "../navigation/footer";
import AdminDashboard from "./adminDashboard";
import { UserContext } from "../context/userContext";
import AccessDenied from "../notFound/accessDenied";


export default function AdminDashboardPage() {

    const {userDetail} = useContext(UserContext);
  
    return (
        <>  
            {userDetail.role === 'admin' ? (
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
