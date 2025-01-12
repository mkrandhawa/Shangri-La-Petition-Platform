import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getData } from "../../../fetchRoutes/getData";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PetitionStatusChart() {

  const [loading, setLoading] = useState(true);

  const [petitions, setPetitions] = useState([]);
  
  const url = process.env.REACT_APP_GET_PETITIONS;


  //Fetch petitions that reached the threshold
  useEffect(() => {
      const fetchPetitions = async () => {
          if (!url) return;
          try {
              const response = await getData(url);
              if (response.status === 'Success') {

                  if(response.data){

                      const transformedData = response.data.map(petition => ({
                          status: petition.status, 
                        }));
              
                        // Update the state with the transformed data
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


  // Preparing data for Chart.js
  const data = {
    labels: ["Open", "Closed"], 
    datasets: [
      {
        label: "Number of Open Petitions",
        data: [
          petitions.filter(petition => petition.status === "open").length,
          petitions.filter(petition => petition.status === "closed").length,
        ], 
        backgroundColor: ["#268d24", "#e44c35"], 
      },
    ],
  };

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} petitions`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Status",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Petitions",
        },
      },
    },
  };

  return (
    <div className="petition-status-chart">
      {loading ? 'Loading...' : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
}

