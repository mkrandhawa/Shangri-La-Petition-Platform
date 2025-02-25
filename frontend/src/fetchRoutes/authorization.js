import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getData } from "../fetchRoutes/getData";  

export default function AuthCheck() {

    const url = process.env.REACT_APP_AUTHORIZE_URL;
    const thresholdUrl = process.env.REACT_APP_REACHED_THRESHOLD;
    
    const { userDetail, setUserDetail, setIsLogged, setLoading, setTotPetitionToReply } = useContext(UserContext); 
    const [isPetitioner, setIsPetitioner] = useState(true);


    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await getData(url);
                    
                if (response.status === 'success') {
                    setUserDetail({
                        fullName: response.data.freshUser.fullName,
                        email: response.data.freshUser.email,
                        dob: response.data.freshUser.dob,
                        createdPetitions: response.data.freshUser.createdPetitions,
                        signedPetitions: response.data.freshUser.signedPetitions,
                        image: response.data.freshUser.image,
                        role: response.data.freshUser.role
                    });
                    
                    setIsLogged(true);

                    if(userDetail.role === 'admin'){

                        setIsPetitioner(false);
                    }
                    
                }
            } catch (err) {
                // Uncomment this if you are working in development
                // console.error('Error checking auth:', err);
            } finally {
                setLoading(false); // Set loading to false once done
            }
        };

        checkAuth();
    }, [setUserDetail, setIsLogged, setLoading, url, userDetail.role, isPetitioner]);


    //Fetch petitions that reached the threshold
    useEffect(() => {
        const fetchPetitions = async () => {
            if (!url) return;
            
            if(isPetitioner === true) return;

            try {
                const response = await getData(thresholdUrl);
                if (response.status === 'Success') {

                    if(response.data){
                        setTotPetitionToReply(response.data.length);
                    }

                }
            } catch (err) {
                console.error('Error fetching petitions:', err);
            } 
        };
        fetchPetitions();
    },[thresholdUrl, setTotPetitionToReply, isPetitioner, url]);

    return null; 
}