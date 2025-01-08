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

  // Get current month and year
  const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
  const currentYear = new Date().getFullYear();

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

  // Group petitions by day of the current month
  const getDailyActivityData = (petitions) => {
    const activityByDay = {};

    petitions.forEach((petition) => {
      const createdAt = new Date(petition.createdAt); 
      const petitionMonth = createdAt.getMonth() + 1; // 0-indexed
      const petitionYear = createdAt.getFullYear();

      // Filter only petitions for the current month and year
      if (petitionMonth === currentMonth && petitionYear === currentYear) {
        const day = createdAt.getDate(); // Get the day of the month

        if (!activityByDay[day]) {
          activityByDay[day] = { created: 0, signed: 0 };
        }

        // Count created petitions
        activityByDay[day].created += 1;

        // Count signed petitions (if any)
        const signedPetitions = petition.signedPetitions || [];
        signedPetitions.forEach(() => {
          activityByDay[day].signed += 1;
        });
      }
    });

    // Prepare chart data
    const labels = [];
    const createdData = [];
    const signedData = [];

    Object.keys(activityByDay).forEach((day) => {
      labels.push(day);
      createdData.push({
        x: parseInt(day, 10),
        y: activityByDay[day].created,
      });
      signedData.push({
        x: parseInt(day, 10),
        y: activityByDay[day].signed,
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
          text: `Day of Month (${currentMonth}/${currentYear})`,
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
  );
}
