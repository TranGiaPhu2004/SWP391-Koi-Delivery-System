import React, { useEffect, useState } from "react";
import "./dashbroad.css"; // CSS for styling

const Dashbroad = () => {
  const [dashboardData, setDashboardData] = useState(null); // State for the dashboard data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch data from API with authorization token from localStorage
        const response = await fetch("http://localhost:8080/dashbroad/user/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }

        const data = await response.json();
        setDashboardData(data); // Set the data into state
        setLoading(false); // Turn off loading state
      } catch (error) {
        setError(error.message); // Handle and display error message
        setLoading(false); // Turn off loading state
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array means this effect runs only once when component mounts

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>; // Display loading message
  }

  if (error) {
    return <div className="dashboard-error">Error: {error}</div>; // Display error message
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Order Section */}
      <div className="dashboard-section">
        <h2>Order</h2>
        <p>Amount: {dashboardData?.order?.amount || 0}</p>
        <p>Total Price: {dashboardData?.order?.totalPrice || 0}</p>
      </div>

      {/* Delivery Methods Section */}
      <div className="dashboard-section">
        <h2>Delivery Methods</h2>
        {dashboardData?.delivery?.length > 0 ? (
          dashboardData.delivery.map((delivery, index) => (
            <div key={index}>
              <p>Method ID: {delivery.deliveryMethodId}</p>
              <p>Amount: {delivery.amount}</p>
              <p>Total Price: {delivery.totalPrice}</p>
            </div>
          ))
        ) : (
          <p>No delivery data available</p>
        )}
      </div>

      {/* Boxes Section */}
      <div className="dashboard-section">
        <h2>Boxes</h2>
        {dashboardData?.box?.length > 0 ? (
          dashboardData.box.map((box, index) => (
            <div key={index}>
              <p>Box ID: {box.boxID}</p>
              <p>Amount: {box.amount}</p>
              <p>Total Price: {box.totalPrice}</p>
            </div>
          ))
        ) : (
          <p>No box data available</p>
        )}
      </div>

      {/* Users Section */}
      <div className="dashboard-section">
        <h2>Users</h2>
        {dashboardData?.user?.length > 0 ? (
          dashboardData.user.map((user, index) => (
            <div key={index}>
              <p>Role ID: {user.roleID}</p>
              <p>Role Name: {user.roleName}</p>
              <p>Amount: {user.amount}</p>
            </div>
          ))
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashbroad;
