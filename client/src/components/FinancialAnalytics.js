import React, { useState, useEffect } from "react";
import axios from "axios";

const FinancialAnalytics = () => {
  const [view, setView] = useState("yearly");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState({ income: 0, expenses: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:5000/financial-analytics",
        {
          params: {
            view,
            year,
            month,
          },
        }
      );
      setData(response.data);
    } catch (err) {
      console.error("Error fetching financial data:", err);
      setError("Error fetching financial data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view, year, month]);

  const handleViewChange = (e) => setView(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Financial Analytics</h2>
      <div className="mb-4">
        <select
          value={view}
          onChange={handleViewChange}
          className="border px-4 py-2 mr-2"
        >
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="number"
          value={year}
          onChange={handleYearChange}
          placeholder="Enter year"
          className="border px-4 py-2 mr-2"
        />
        {view === "monthly" && (
          <select
            value={month}
            onChange={handleMonthChange}
            className="border px-4 py-2"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <p>Income: ${data.income}</p>
          <p>Expenses: ${data.expenses}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialAnalytics;
