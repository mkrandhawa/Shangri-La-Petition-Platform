import React from "react";
import { useLocation } from "react-router-dom";
import SideNavigation from "../navigation/sideNavigation";
import UserDetails from "./user/userDetails";
import MyPetitions from "./petitions/myPetitions";
import Petition from "./petitions/petitions";
import AddPetition from "./addPetition/addPetition";


export default function Dashboard() {

    const location = useLocation();

    const { pathname } = location;

    return (
        <>
            <main className="homePage dashboardPage">
                {/* Container for the side navigation */}
                <div className="sideNavigation">
                    <SideNavigation />
                </div>
            
                {/* Container for the main content */}
                <div className="dashboardContent">

                    {pathname==='/dashboard' && <UserDetails />}
                    {pathname==='/petitions' && <Petition />}
                    {/* {pathname==='/petitions?status=open'&& <OpenPetition />}
                    {pathname==='/petitions?status=closed'&& <ClosedPetition />} */}
                    {pathname==='/addPetition' && <AddPetition />}
                    {pathname==='/myPetitions' && <MyPetitions />}

                </div>


            </main>
            
        </>
    )
}