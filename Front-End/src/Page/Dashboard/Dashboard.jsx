import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import "./dashboard.css";
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

  const [filteredDailyRevenueData, setFilteredDailyRevenueData] = useState([]);
  const [filteredMonthlyRevenueData, setFilteredMonthlyRevenueData] = useState([]);
  const [filteredYearlyRevenueData, setFilteredYearlyRevenueData] = useState([]);

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
  const aggregateRevenue = (orders, format, filter = false) => {
    const revenueMap = {};

    orders.forEach((order) => {
      if (!filter || (filter && order.orderStatus === 5 && order.paymentStatus === true)) {
        const dateKey = formatDate(order.orderDate, format);
        if (order.totalPrice) {  // Ensure the totalPrice is present and valid
          revenueMap[dateKey] = (revenueMap[dateKey] || 0) + order.totalPrice;
        }
      }
    });

    return revenueMap;
  };

  useEffect(() => {
    if (orders && orders.length > 0) {
      // For filtered orders (orderStatus === 5 and paymentStatus === true)
      const dailyFilteredRevenue = aggregateRevenue(orders, "day", true);
      const monthlyFilteredRevenue = aggregateRevenue(orders, "month", true);
      const yearlyFilteredRevenue = aggregateRevenue(orders, "year", true);

      // For all orders (no filter)
      const dailyRevenue = aggregateRevenue(orders, "day", false);
      const monthlyRevenue = aggregateRevenue(orders, "month", false);
      const yearlyRevenue = aggregateRevenue(orders, "year", false);
  
      // Sort daily revenue by date
      const sortedDailyKeys = Object.keys(dailyRevenue).sort((a, b) => new Date(a) - new Date(b));
      const sortedDailyValues = sortedDailyKeys.map(key => dailyRevenue[key]);

      const sortedFilteredDailyKeys = Object.keys(dailyFilteredRevenue).sort((a, b) => new Date(a) - new Date(b));
      const sortedFilteredDailyValues = sortedFilteredDailyKeys.map(key => dailyFilteredRevenue[key]);
  
      // Sort monthly revenue by date
      const sortedMonthlyKeys = Object.keys(monthlyRevenue).sort((a, b) => new Date(a) - new Date(b));
      const sortedMonthlyValues = sortedMonthlyKeys.map(key => monthlyRevenue[key]);

      const sortedFilteredMonthlyKeys = Object.keys(monthlyFilteredRevenue).sort((a, b) => new Date(a) - new Date(b));
      const sortedFilteredMonthlyValues = sortedFilteredMonthlyKeys.map(key => monthlyFilteredRevenue[key]);
  
      // Set chart data for non-filtered (Max Revenue)
      setDailyRevenueData({
        labels: sortedDailyKeys,
        datasets: [
          {
            label: "Daily Revenue",
            data: sortedDailyValues,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });

      setMonthlyRevenueData({
        labels: sortedMonthlyKeys,
        datasets: [
          {
            label: "Monthly Revenue",
            data: sortedMonthlyValues,
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

      // Set chart data for filtered (Actual Revenue)
      setFilteredDailyRevenueData({
        labels: sortedFilteredDailyKeys,
        datasets: [
          {
            label: "Daily Revenue",
            data: sortedFilteredDailyValues,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });

      setFilteredMonthlyRevenueData({
        labels: sortedFilteredMonthlyKeys,
        datasets: [
          {
            label: "Monthly Revenue",
            data: sortedFilteredMonthlyValues,
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      });

      setFilteredYearlyRevenueData({
        labels: Object.keys(yearlyFilteredRevenue),
        datasets: [
          {
            label: "Yearly Revenue",
            data: Object.values(yearlyFilteredRevenue),
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
      {/* Max Revenue Dashboard */}
      <h1>Max Revenue Dashboard</h1>
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

      {/* Actual Revenue Dashboard */}
      <h1>Actual Revenue Dashboard</h1>
      <div className="dashboard-charts-wrapper">
        {/* Daily Revenue Chart */}
        {filteredDailyRevenueData.labels && filteredDailyRevenueData.datasets && filteredDailyRevenueData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Daily Revenue</h2>
            <Bar data={filteredDailyRevenueData} options={{ responsive: true, plugins: { title: { display: true, text: 'Daily Revenue' } }}} />
          </div>
        )}

        {/* Monthly Revenue Chart */}
        {filteredMonthlyRevenueData.labels && filteredMonthlyRevenueData.datasets && filteredMonthlyRevenueData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Monthly Revenue</h2>
            <Bar data={filteredMonthlyRevenueData} options={{ responsive: true, plugins: { title: { display: true, text: 'Monthly Revenue' } }}} />
          </div>
        )}

        {/* Yearly Revenue Chart */}
        {filteredYearlyRevenueData.labels && filteredYearlyRevenueData.datasets && filteredYearlyRevenueData.labels.length > 0 && (
          <div className="chart-container">
            <h2>Yearly Revenue</h2>
            <Line data={filteredYearlyRevenueData} options={{ responsive: true, plugins: { title: { display: true, text: 'Yearly Revenue' } }}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
