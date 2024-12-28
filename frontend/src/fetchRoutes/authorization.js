import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { getData } from "../fetchRoutes/getData";  

export default function AuthCheck() {
    const url = process.env.REACT_APP_AUTHORIZE_URL;
    const { setUserDetail, setIsLogged, setLoading } = useContext(UserContext); 

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
                }
            } catch (err) {
                console.error('Error checking auth:', err);
            } finally {
                setLoading(false); // Set loading to false once done
            }
        };

        checkAuth();
    }, [setUserDetail, setIsLogged, setLoading, url]);

    return null; //
}