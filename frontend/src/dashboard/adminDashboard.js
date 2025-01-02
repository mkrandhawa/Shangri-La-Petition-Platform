import React from "react";
import { useLocation } from "react-router-dom";
import SideNavigation from "../navigation/sideNavigation";
import Petition from "./petitions/petitions";
import PetitionReply from "./admin/petitionsToReply";
import AddThreshold from "./admin/addThreshold";
import AnalysisDashboard from "./admin/analysisDashboard";



export default function AdminDashboard() {

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

                    {pathname==='/adminDashboard' && <AnalysisDashboard />}
                    {pathname==='/slpp/petitions' && <Petition />}
                    {pathname==='/reply' && <PetitionReply />}
                    {pathname==='/setThreshold' && <AddThreshold />}

                </div>


            </main>
            
        </>
    )
}