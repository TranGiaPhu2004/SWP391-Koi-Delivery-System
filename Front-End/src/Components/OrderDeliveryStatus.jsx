import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import track1 from "../assets/image/track1.png";
import track2 from "../assets/image/track2.png";
import track3 from "../assets/image/track3.png";
import track4 from "../assets/image/track4.png";
import track5 from "../assets/image/track5.png";
import "./OrderDeliveryStatus.css";
import { useNavigate } from "react-router-dom";

function OrderDeliveryStatus() {
  const { orderId } = useParams(); // Get orderId from the URL parameter
  const [status, setStatus] = useState(0); // Current status from API
  const [selectedStatus, setSelectedStatus] = useState(0); // Status selected by the user
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      fetchOrderStatus();
    }
  }, [orderId]);

  const fetchOrderStatus = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/orders/${orderId}/status`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order status.");
      }

      const data = await response.json();
      const statusId = data.orderStatusID - 1; // Adjust the status to match the index (0-based)
      setStatus(statusId);
      setSelectedStatus(statusId); // Set selectedStatus to the current status from API
    } catch (err) {
      console.error("Error fetching order status:", err);
      setAlertMessage("Failed to fetch order status. Please try again.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (index) => {
    // Ngăn người dùng chọn trạng thái trước đó
    if (index < status) {
      setAlertMessage("You cannot select a previous status.");
      setShowAlert(true);
    } 
    // Ngăn người dùng bỏ qua trạng thái
    else if (index > status + 1) {
      setAlertMessage("You must follow the order of statuses. You cannot skip statuses.");
      setShowAlert(true);
    } 
    else {
      setSelectedStatus(index); // Cho phép chọn trạng thái hợp lệ
    }
  };

  const handleSubmit = async () => {
    if (selectedStatus !== status + 1) {
      setAlertMessage("You can only move to the next status in the sequence.");
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      const statusId = selectedStatus + 1; // Gửi trạng thái tiếp theo (tăng thêm 1)
      const response = await fetch(
        `http://localhost:8080/orders/${orderId}/status/${statusId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status.");
      }

      const data = await response.json();
      console.log("Order status updated successfully:", data);
      setAlertMessage("Order status updated successfully!");
      setShowAlert(true);
    } catch (err) {
      console.error("Error updating order status:", err);
      setAlertMessage("The order delivery status could not be changed.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="OrderDeliveryStatus-main-tracking">
      <div className="OrderDeliveryStatus-header-tracking">
        <p>DELIVERY STATUS</p>
      </div>

      <div className="OrderDeliveryStatus-order-id">
        <label htmlFor="orderId">Current Order ID:</label>
        <input type="text" id="orderId" value={orderId} readOnly />
      </div>

      <div className="OrderDeliveryStatus-tracking-order">
        {[track1, track2, track3, track4, track5].map((track, index) => (
          <div key={index} className={`OrderDeliveryStatus-tracking${index}`}>
            <img
              className={`pic ${status >= index ? "active" : "blurred"}`}
              src={track}
              alt={`Status ${index}`}
            />
            <p>
              {
                [
                  "Order Received",
                  "Order Picked",
                  "Order In Transit",
                  "Out For Delivery",
                  "Reached Destination",
                ][index]
              }
            </p>
            <label>
              <input
                type="radio"
                name="status"
                value={index}
                checked={selectedStatus === index}
                onChange={() => handleStatusChange(index)} // Gọi hàm kiểm tra trạng thái khi chọn
              />
              {`Your order is currently ${
                [
                  "received",
                  "picked",
                  "in transit",
                  "out for delivery",
                  "at destination",
                ][index]
              }.`}
            </label>
          </div>
        ))}
      </div>

      <div className="OrderDeliveryStatus-submit">
        <button onClick={handleSubmit} disabled={loading || !orderId}>
          {loading ? "Updating..." : "Submit"}
        </button>
      </div>
      {showAlert && (
        <div className="custom-alert">
          <span>{alertMessage}</span>
          {/* Khi nhấn nút "Close", sẽ tắt alert và chuyển hướng */}
          <button
            onClick={() => {
              setShowAlert(false); // Tắt alert
              navigate("/ManagerOrder"); // Chuyển hướng sau khi tắt alert
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderDeliveryStatus;
