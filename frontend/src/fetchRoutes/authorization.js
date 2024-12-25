import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { getData } from "../fetchRoutes/getData";  

export default function AuthCheck() {
    const url = process.env.REACT_APP_AUTHORIZE_URL;
    
    const { userDetail, setUserDetail, setIsLogged } = useContext(UserContext);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getData(url);
                    
                if (response.status === 'success') {
                    await setUserDetail({
                        fullName: response.data.freshUser.fullName,
                        email: response.data.freshUser.email,
                    });
                    
                    setIsLogged(true);
                   
                }
            } catch (err) {
                console.error('Error checking auth:', err);
            }
        };

        checkAuth();
    }, []);

    return null;  // This component doesn't need to render anything
}