import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import "./dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [amountChartData, setAmountChartData] = useState([]);
  const [revenueChartData, setRevenueChartData] = useState([]);
  const [actualRevenueChartData, setActualRevenueChartData] = useState([]); // Thêm dữ liệu cho doanh thu thực tế
  const location = useLocation();

  // Function to fetch the data for a specific day from your API
  const fetchDailyData = async (year, month, day) => {
    try {
      const response = await fetch(
        `http://localhost:8080/dashboard/year/${year}/month/${month}/day/${day}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      if (response.ok) {
        const totalOrderAmount = data.order.amount;
        const totalOrderRevenue = data.order.totalPrice;

        // Aggregate delivery data
        const totalDeliveryAmount = data.delivery.reduce(
          (sum, delivery) => sum + delivery.amount,
          0
        );
        const totalDeliveryRevenue = data.delivery.reduce(
          (sum, delivery) => sum + delivery.totalPrice,
          0
        );

        // Aggregate box data
        const totalBoxAmount = data.box.reduce(
          (sum, box) => sum + box.amount,
          0
        );
        const totalBoxRevenue = data.box.reduce(
          (sum, box) => sum + box.totalPrice,
          0
        );

        // Tính toán doanh thu thực tế (trừ 5% cho Boxes và Deliveries)
        const actualDeliveryRevenue = totalDeliveryRevenue * 0.95;
        const actualBoxRevenue = totalBoxRevenue * 0.95;
        const actualOrderRevenue = totalOrderRevenue ; // Orders không bị giảm 5%

        // Set data for the Amount chart
        setAmountChartData({
          labels: ["Orders", "Deliveries", "Boxes"],
          datasets: [
            {
              label: "Amount",
              data: [totalOrderAmount, totalDeliveryAmount, totalBoxAmount],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });

        // Set data for the Revenue chart
        setRevenueChartData({
          labels: ["Orders", "Deliveries", "Boxes"],
          datasets: [
            {
              label: "Revenue (VND)",
              data: [totalOrderRevenue, totalDeliveryRevenue, totalBoxRevenue],
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });

        // Set data for the Actual Revenue chart (trừ 5%)
        setActualRevenueChartData({
          labels: ["Orders", "Deliveries", "Boxes"],
          datasets: [
            {
              label: "Actual Revenue (VND)",
              data: [actualOrderRevenue, actualDeliveryRevenue, actualBoxRevenue],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.log("Error fetching data:", data.msg);
        return null;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed
    const day = today.getDate();

    // Fetch daily data from the API
    fetchDailyData(year, month, day);
  }, []);

  return (
    <div>
      {/* Max Revenue Dashboard */}
      <h1>Daily Revenue Dashboard</h1>

      <div className="dashboard-charts-wrapper">
        {/* Wrapper for both charts */}
        <div className="charts-row">
          {/* Amount Chart */}
          {amountChartData.labels &&
            amountChartData.datasets &&
            amountChartData.labels.length > 0 && (
              <div className="chart-container amount-chart">
                <h2>Amount Overview (Orders, Deliveries, Boxes)</h2>
                <Bar
                  data={amountChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Total Amount (Orders, Deliveries, Boxes)",
                      },
                    },
                  }}
                />
              </div>
            )}

          {/* Revenue Chart */}
          {revenueChartData.labels &&
            revenueChartData.datasets &&
            revenueChartData.labels.length > 0 && (
              <div className="chart-container">
                <h2>Revenue Overview (Orders, Deliveries, Boxes)</h2>
                <Bar
                  data={revenueChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Total Revenue (VND) (Orders, Deliveries, Boxes)",
                      },
                    },
                  }}
                />
              </div>
            )}
        </div>
      </div>

      {/* Actual Daily Revenue Dashboard */}
      <h1>Actual Daily Revenue Dashboard</h1>

      <div className="dashboard-charts-wrapper">
        <div className="charts-row">
          {/* Actual Revenue Chart */}
          {actualRevenueChartData.labels &&
            actualRevenueChartData.datasets &&
            actualRevenueChartData.labels.length > 0 && (
              <div className="chart-container">
                <h2>Actual Revenue Overview (Orders, Deliveries, Boxes)</h2>
                <Bar
                  data={actualRevenueChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Actual Revenue (VND) (Orders, Deliveries, Boxes)",
                      },
                    },
                  }}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
