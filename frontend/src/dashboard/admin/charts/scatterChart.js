import React, { useEffect, useState } from "react";
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getData } from "../../../fetchRoutes/getData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function PetitionActivityOverTime() {
  const url = process.env.REACT_APP_GET_PETITIONS; 

  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch petitions data
  useEffect(() => {
    const fetchPetitions = async () => {
      if (!url) return;
      try {
        const response = await getData(url);
        if (response.status === "Success" && response.data) {
          setPetitions(response.data);
        }
      } catch (err) {
        console.error("Error fetching petitions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPetitions();
  }, [url]);

  // Group petitions by day of the month
  const getDailyActivityData = (petitions) => {
    const activityByDay = {};

    petitions.forEach((petition) => {
      const createdAt = new Date(petition.createdAt); 
      const day = createdAt.getDate(); 
      const monthYear = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`; 
      if (!activityByDay[monthYear]) {
        activityByDay[monthYear] = {};
      }

      if (!activityByDay[monthYear][day]) {
        activityByDay[monthYear][day] = { created: 0, signed: 0 };
      }

      // Count created petitions
      activityByDay[monthYear][day].created += 1;

      // Count signed petitions (if any)
      const signedPetitions = petition.signedPetitions || [];
      signedPetitions.forEach(() => {
        activityByDay[monthYear][day].signed += 1;
      });
    });

    //Chart data prep
    const labels = [];
    const createdData = [];
    const signedData = [];

    Object.keys(activityByDay).forEach((monthYear) => {
      Object.keys(activityByDay[monthYear]).forEach((day) => {
        labels.push(`${monthYear}-${day}`);
        createdData.push({
          x: parseInt(day, 10),
          y: activityByDay[monthYear][day].created,
        });
        signedData.push({
          x: parseInt(day, 10),
          y: activityByDay[monthYear][day].signed,
        });
      });
    });

    return { labels, createdData, signedData };
  };

  // Prepare chart data
  const { createdData, signedData } = getDailyActivityData(petitions);

  const chartData = {
    datasets: [
      {
        label: "Petitions Created",
        data: createdData,
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)", 
        pointRadius: 5, 
      },
      {
        label: "Petitions Signed",
        data: signedData,
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderColor: "rgba(255, 99, 132, 1)", 
        pointRadius: 5,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Day: ${tooltipItem.raw.x}, Count: ${tooltipItem.raw.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day of Month',
        },
        min: 1,
        max: 31,
        ticks: {
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Petitions',
        },
        min: 0,
        grid: {
          display: false, 
        },
      },
    },
  };

  return (
    <div className="scatterPlot">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Scatter data={chartData} options={options} />
      )}
    </div>
  )
}