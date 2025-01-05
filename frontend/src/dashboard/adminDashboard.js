import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import SideNavigation from "../navigation/sideNavigation";
import Petition from "./petitions/petitions";
import PetitionReply from "./admin/petitionsToReply";
import AddThreshold from "./admin/addThreshold";
import AnalysisDashboard from "./admin/analysisDashboard";
import { UserContext } from "../context/userContext";
import AccessDenied from "../notFound/accessDenied";



export default function AdminDashboard() {

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
                    {userDetail.role == 'admin' ? (
                        <>  
                            {pathname==='/adminDashboard' && <AnalysisDashboard />}
                            {pathname==='/reply' && <PetitionReply />}
                            {pathname==='/setThreshold' && <AddThreshold />}
                        
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