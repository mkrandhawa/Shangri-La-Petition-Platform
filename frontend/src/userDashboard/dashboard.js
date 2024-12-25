import React from "react";
import SideNavigation from "../navigation/sideNavigation";


export default function Dashboard() {
    return (
        <>
            <main className="dashboardPage">
                {/* Container for the side navigation */}
                <div className="sideNavigation">
                    <SideNavigation />
                </div>
            
                {/* Container for the main content */}
                <div className="dashboardContent">

                </div>


            </main>
            
        </>
    )
}