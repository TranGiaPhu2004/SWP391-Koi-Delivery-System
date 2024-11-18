import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import "./dashboard.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Dashboard = () => {
  const [dailyRevenueData, setDailyRevenueData] = useState([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const [yearlyRevenueData, setYearlyRevenueData] = useState([]);
  const location = useLocation();
  const orders = location.state?.orders || [];  // Get orders from location state or default to an empty array

  // Helper function to format date as YYYY-MM-DD, YYYY-MM, or YYYY
  const formatDate = (date, format) => {
    const d = new Date(date);
    if (format === "day") return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
    if (format === "month") return d.toISOString().slice(0, 7);  // "YYYY-MM"
    if (format === "year") return d.getFullYear().toString();     // "YYYY"
    return date;
  };

  // Aggregate revenue by time period (day, month, year)
  const aggregateRevenue = (orders, format) => {
    const revenueMap = {};

    orders.forEach((order) => {
      const dateKey = formatDate(order.orderDate, format);
      if (order.totalPrice) {  // Ensure the totalPrice is present and valid
        revenueMap[dateKey] = (revenueMap[dateKey] || 0) + order.totalPrice;
      }
    });

    return revenueMap;
  };

  useEffect(() => {
    if (orders && orders.length > 0) {
      const dailyRevenue = aggregateRevenue(orders, "day");
      console.log("Daily Revenue", dailyRevenue);
      const monthlyRevenue = aggregateRevenue(orders, "month");
      console.log("Monthly Revenue", monthlyRevenue);
      const yearlyRevenue = aggregateRevenue(orders, "year");
      console.log("Yearly Revenue", yearlyRevenue);

      setDailyRevenueData({
        labels: Object.keys(dailyRevenue),
        datasets: [
          {
            label: "Daily Revenue",
            data: Object.values(dailyRevenue),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });

      setMonthlyRevenueData({
        labels: Object.keys(monthlyRevenue),
        datasets: [
          {
            label: "Monthly Revenue",
            data: Object.values(monthlyRevenue),
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      });

      setYearlyRevenueData({
        labels: Object.keys(yearlyRevenue),
        datasets: [
          {
            label: "Yearly Revenue",
            data: Object.values(yearlyRevenue),
            backgroundColor: "rgba(255, 159, 64, 0.6)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      });
    } else {
      console.log("No orders found or data is empty.");
    }
  }, [orders]);

  return (
    <div>
      <h1>Revenue Dashboard</h1>

      <div className="dashboard-charts-wrapper">
        {/* Daily Revenue Chart */}
        {dailyRevenueData.labels && dailyRevenueData.datasets && dailyRevenueData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Daily Revenue</h2>
            <Bar data={dailyRevenueData} options={{ responsive: true, plugins: { title: { display: true, text: 'Daily Revenue' } }}} />
          </div>
        )}

        {/* Monthly Revenue Chart */}
        {monthlyRevenueData.labels && monthlyRevenueData.datasets && monthlyRevenueData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Monthly Revenue</h2>
            <Bar data={monthlyRevenueData} options={{ responsive: true, plugins: { title: { display: true, text: 'Monthly Revenue' } }}} />
          </div>
        )}

        {/* Yearly Revenue Chart */}
        {yearlyRevenueData.labels && yearlyRevenueData.datasets && yearlyRevenueData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Yearly Revenue</h2>
            <Line data={yearlyRevenueData} options={{ responsive: true, plugins: { title: { display: true, text: 'Yearly Revenue' } }}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
