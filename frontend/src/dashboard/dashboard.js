import React, {useState, useEffect, useContext} from "react";
import { useLocation } from "react-router-dom";
import SideNavigation from "../navigation/sideNavigation";
import UserDetails from "./user/userDetails";
import MyPetitions from "./petitions/myPetitions";
import Petition from "./petitions/petitions";
import AddPetition from "./addPetition/addPetition";
import { UserContext } from "../context/userContext";
import AccessDenied from "../notFound/accessDenied";



export default function Dashboard() {

    const location = useLocation();


    const { pathname } = location;

    const {userDetail} = useContext(UserContext);

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
                    {userDetail.role === 'petitioner' ? (
                        <>  
                            {pathname==='/dashboard' && <UserDetails />}
                            {pathname==='/addPetition' && <AddPetition />}
                            {pathname==='/myPetitions' && <MyPetitions />}          
                        
                        </>
                        ):(
                            <AccessDenied />
                    )}
                    
                    {pathname==='/slpp/petitions' && <Petition />}
                    

                </div>


            </main>
            
        </>
    )
}