import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { getData } from "../fetchRoutes/getData";  

export default function AuthCheck() {
    const url = 'http://localhost:8000/api/user/auth/isLoggedIn';
    
    const { setUserDetail, setIsLogged } = useContext(UserContext);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getData(url);
                    
                if (response.status === 'success') {
                    await setUserDetail({
                        fullName: response.data.freshUser.fullName,
                        email: response.data.freshUser.email
                    });
                    setIsLogged(true);
                }
            } catch (err) {
                console.error('Error checking auth:', err);
            }
        };

        checkAuth();
    }, []); // Empty dependency array ensures this runs only once

    return null;  // This component doesn't need to render anything
}