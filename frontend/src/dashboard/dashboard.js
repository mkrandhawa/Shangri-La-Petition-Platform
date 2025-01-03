import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import SideNavigation from "../navigation/sideNavigation";
import UserDetails from "./user/userDetails";
import MyPetitions from "./petitions/myPetitions";
import Petition from "./petitions/petitions";
import AddPetition from "./addPetition/addPetition";


export default function Dashboard() {

    const location = useLocation();


    const { pathname } = location;

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
        
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    return (
        <>
            <main className="homePage dashboardPage">
                {/* Container for the side navigation */}

                { ! isMobile && 
                    <div className="sideNavigation">
                        <SideNavigation />
                    </div>
                }
            
                {/* Container for the main content */}
                <div className="dashboardContent">

                    {pathname==='/dashboard' && <UserDetails />}
                    {pathname==='/slpp/petitions' && <Petition />}
                    {pathname==='/addPetition' && <AddPetition />}
                    {pathname==='/myPetitions' && <MyPetitions />}

                </div>


            </main>
            
        </>
    )
}