import React from "react";
import { useLocation } from "react-router-dom";
import SideNavigation from "../navigation/sideNavigation";
import UserDetails from "./user/userDetails";
import MyPetitions from "./petitions/myPetitions";


export default function Dashboard() {

    const location = useLocation();

    const { pathname } = location;

    return (
        <>
            <main className="dashboardPage">
                {/* Container for the side navigation */}
                <div className="sideNavigation">
                    <SideNavigation />
                </div>
            
                {/* Container for the main content */}
                <div className="dashboardContent">

                    {pathname==='/dashboard' && <UserDetails />}
                    {pathname==='/petitions' && <h1>Petitions</h1>}
                    {pathname==='/addPetition' && <h1>Add petitions</h1>}
                    {pathname==='/myPetitions' && <MyPetitions />}

                </div>


            </main>
            
        </>
    )
}