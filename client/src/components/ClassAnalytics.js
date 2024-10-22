import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ClassAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/classes/analytics"
        );
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Error fetching analytics data. Please try again later.");
      }
    };

    fetchAnalytics();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const data = {
    labels: analyticsData.map((cls) => cls.className),
    datasets: [
      {
        label: "Number of Students",
        data: analyticsData.map((cls) => cls.numberOfStudents),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
      {
        label: "Total Fees",
        data: analyticsData.map((cls) => cls.totalFees),
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Class Analytics Overview",
        font: {
          size: 20,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#e2e2e2",
        },
      },
      x: {
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#e2e2e2",
        },
      },
    },
  };

  return (
    <div className="p-5 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 relative">
        Class Analytics
        <span className="block h-1 bg-indigo-500 mt-2 mx-auto w-1/4"></span>
      </h2>
      <div className=" bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full transition-transform duration-300 transform hover:scale-105">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ClassAnalytics;
