import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
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

  // State for selected month and year (Default month and year are set to the current month and year)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 

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

  // Group petitions by day of the selected month and year
  const getDailyActivityData = (petitions) => {
    const activityByDay = {};

    petitions.forEach((petition) => {
      const createdAt = new Date(petition.createdAt);
      const petitionMonth = createdAt.getMonth() + 1; // Months are 0-indexed
      const petitionYear = createdAt.getFullYear();

      // Filter only petitions for the selected month and year
      if (petitionMonth === selectedMonth && petitionYear === selectedYear) {
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

    Object.keys(activityByDay).forEach((day) => {
      labels.push(day);
      createdData.push({
        x: parseInt(day, 10),
        y: activityByDay[day].created,
      });

    });

    return { labels, createdData };
  };

  // Prepare chart data
  const { createdData } = getDailyActivityData(petitions);

  const chartData = {
    datasets: [
      {
        label: "Petitions Created",
        data: createdData,
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointRadius: 5,
      }
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
          text: `Day of Month (${selectedMonth}/${selectedYear})`,
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
          text: "Number of Petitions",
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
      <div className="controls">
        <label>
          Month:
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </label>
        <label>
          Year:
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            min="2000"
            max={new Date().getFullYear()}
          />
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Scatter data={chartData} options={options} />
      )}
    </div>
  );
}
