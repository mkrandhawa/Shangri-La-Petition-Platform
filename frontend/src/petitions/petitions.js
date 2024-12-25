import React, {useEffect, useState} from 'react';
import {getData} from '../fetchRoutes/getData';

export default function Petition() {

    const url = process.env.REACT_APP_GET_PETITIONS;

    const [petitions, setPetitions] = useState([]);


    useEffect(() => {
        const fetchPetitions = async () => {
            try {
                const response = await getData(url);
                console.log(response)

                if(response.status === 'Success'){
                    setPetitions(p=> response.data);
                    
                }
                
            } catch (err) {
                console.error('Error fetching petitions:', err);
            }
        };

        fetchPetitions();
    },[url, setPetitions]);


    return (
        <>
            <main className='petitionPage'>
                <h2>Hello i am petition page</h2>
            </main>
        </>
    )
       
}

