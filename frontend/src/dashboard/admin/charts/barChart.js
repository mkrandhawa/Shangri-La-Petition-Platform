import React, { useEffect, useState } from "react";
import { Chart } from 'react-google-charts';
import { getData } from "../../../fetchRoutes/getData";

export default function BarChartSignatures(){


    const [loading, setLoading] = useState(true);
    
    const [petitions, setPetitions] = useState([]);

    const url = process.env.REACT_APP_GET_PETITIONS;


    //Fetch petitions 
    useEffect(() => {
        const fetchPetitions = async () => {
            if (!url) return;
            try {
                const response = await getData(url);
                if (response.status === 'Success') {

                    if(response.data){

                        const transformedData = response.data.map(petition => ({
                            title: petition.title,
                            countSigns: petition.countSigns,
                            }));
            
                            setPetitions(transformedData);
                        
                    }

                }
            } catch (err) {
                console.error('Error fetching petitions:', err);
            } finally{
                setLoading(false);
            }
        };
        fetchPetitions();

    },[url]);

    // Convert petitions 
    const petitionData = [
        ['Title', 'Signatures'],  // Column headers for Google Charts
        ...petitions.map(petition => [petition.title, petition.countSigns]),
    ];

    //Set the options for the chart
    const options = {
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Total Signatures',
            minValue: 0,
        },
        vAxis: {
            title: 'Petition',
        },
        backgroundColor: 'rgb(249, 251, 249)',
    };
    

    return (
        <>
            {loading ? 'Loading...' : (
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="90%"
                    data={petitionData}
                    options={options}
                />
                
            )}
        </>
    )

    


}