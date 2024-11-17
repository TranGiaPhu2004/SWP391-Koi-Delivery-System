import { useEffect, useState } from "react";
import logo from "../assets/image/Logo.png";
import avatar from "../assets/image/avatar.png";
import search from "../assets/image/search.png";
import EditIcon from "../assets/image/edit.svg";
import "./ManagerPrice.css";
import LogoutButton from "../Logout";
import { Link, useNavigate } from "react-router-dom";

const ManagerPrice = () => {
  const navigate = useNavigate();

  // State để lưu dữ liệu từ API
  const [services, setServices] = useState([]);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [koiBoxes, setKoiBoxes] = useState([]); // State cho koi-boxes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm gọi API để lấy danh sách dịch vụ, phương thức giao hàng, và koi-box
  const fetchData = async () => {
    try {
      // Gọi API service
      const serviceResponse = await fetch("http://localhost:8080/service/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu API yêu cầu token
        },
      });

      if (!serviceResponse.ok) {
        throw new Error("Failed to fetch services");
      }

      const serviceData = await serviceResponse.json();
      setServices(serviceData.serviceList); // Lưu danh sách service vào state

      // Gọi API deliveryMethod
      const deliveryResponse = await fetch(
        "http://localhost:8080/deliveryMethod/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu API yêu cầu token
          },
        }
      );

      if (!deliveryResponse.ok) {
        throw new Error("Failed to fetch delivery methods");
      }

      const deliveryData = await deliveryResponse.json();
      setDeliveryMethods(deliveryData.deliveryMethods); // Lưu danh sách phương thức giao hàng vào state

      // Gọi API koi-box
      const koiResponse = await fetch("http://localhost:8080/koi-box/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu API yêu cầu token
        },
      });

      if (!koiResponse.ok) {
        throw new Error("Failed to fetch koi boxes");
      }

      const koiData = await koiResponse.json();
      setKoiBoxes(koiData.boxTypes); // Lưu danh sách koi box vào state

      setLoading(false); // Ngừng trạng thái loading
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // useEffect chỉ chạy khi component được mount

  // Hàm cập nhật giá cho dịch vụ, phương thức giao hàng, hoặc koi-box
  const updatePrice = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu API yêu cầu token
        },
        body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
      });

      if (!response.ok) {
        throw new Error("Failed to update price");
      }

      // Sau khi cập nhật thành công, ta gọi lại API để lấy dữ liệu mới
      await fetchData(); // Gọi lại fetchData để cập nhật lại giá trị mới

      alert("Price updated successfully");
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Error updating price");
    }
  };

  // Xử lý khi người dùng cập nhật giá của dịch vụ
  const handleServicePriceChange = (e, serviceId) => {
    const newPrice = e.target.value;
    const data = {
      serviceID: serviceId,
      price: newPrice,
    };
    updatePrice(
      `http://localhost:8080/service/${serviceId}/price/${newPrice}`,
      data
    );
  };

  // Xử lý khi người dùng cập nhật giá của phương thức giao hàng
  const handleDeliveryPriceChange = (e, deliveryMethodId) => {
    const newPrice = e.target.value;
    const data = {
      deliveryMethodId: deliveryMethodId,
      methodName: "Updated Method", // Thêm tên phương thức nếu cần chỉnh sửa
      price: newPrice,
    };
    updatePrice(`http://localhost:8080/deliveryMethod/update`, data);
  };

  // Xử lý khi người dùng cập nhật giá của koi-box
  const handleKoiBoxPriceChange = (e, boxId) => {
    const newPrice = e.target.value;
    const data = {
      boxid: boxId,
      price: newPrice,
    };
    updatePrice("http://localhost:8080/koi-box", data);
  };

  if (loading) {
    return <p>Loading data...</p>; // Hiển thị khi đang tải dữ liệu
  }

  if (error) {
    return <p>{error}</p>; // Hiển thị thông báo lỗi nếu có lỗi xảy ra
  }

  return (
    <div className="ManagerPrice-container">
      <aside className="ManagerPrice-sidebar">
        <div className="ManagerPrice-logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="ManagerPrice-nav">
          <ul className="ManagerPrice-nav-list">
            <li className="ManagerPrice-nav-item">
              <Link to="/Manager">Account Management</Link>
            </li>
            <li className="ManagerPrice-nav-item">
              <Link to="/PriceManager">Price Manager</Link>
            </li>
            <li className="ManagerPrice-nav-item">
              <Link to="/ManagerOrder">Order Manager</Link>
            </li>
          </ul>
        </nav>
        <LogoutButton />
      </aside>

      <main className="ManagerPrice-main-content">
        <header className="ManagerPrice-header">
          <div className="ManagerPrice-user-info">
            <img
              src={avatar}
              alt="User Avatar"
              className="ManagerPrice-avatar"
            />
            <div className="ManagerPrice-user-details">
              <h3>admin</h3>
              <p>Manager</p>
            </div>
          </div>
        </header>

        <div className="ManagerPrice-price-management">
          <h1>Price Management</h1>

          {/* Bảng hiển thị giá của các dịch vụ */}
          <table className="ManagerPrice-price-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Service Name</th>
                <th>Service Price</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.serviceId}>
                  <td>{service.serviceId}</td>
                  <td>{service.serviceName}</td>
                  <td>
                    <input
                      type="text"
                      defaultValue={service.price}
                      onBlur={(e) =>
                        handleServicePriceChange(e, service.serviceId)
                      }
                    />
                  </td>
                  <td>
                    <button className="ManagerPrice-btn-update">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bảng hiển thị giá của các phương thức giao hàng */}
          <table className="ManagerPrice-price-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Delivery Method Name</th>
                <th>Delivery Method Price</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {deliveryMethods.map((method) => (
                <tr key={method.deliveryMethodId}>
                  <td>{method.deliveryMethodId}</td>
                  <td>{method.methodName}</td>
                  <td>
                    <input
                      type="text"
                      defaultValue={method.price}
                      onBlur={(e) =>
                        handleDeliveryPriceChange(e, method.deliveryMethodId)
                      }
                    />
                  </td>
                  <td>
                    <button className="ManagerPrice-btn-update">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bảng hiển thị giá của koi-box */}
          <table className="ManagerPrice-price-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Box Name</th>
                <th>Box Price</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {koiBoxes.map((box) => (
                <tr key={box.boxid}>
                  <td>{box.boxid}</td>
                  <td>{box.boxname}</td>
                  <td>
                    <input
                      type="text"
                      defaultValue={box.price}
                      onBlur={(e) => handleKoiBoxPriceChange(e, box.boxid)}
                    />
                  </td>
                  <td>
                    <button className="ManagerPrice-btn-update">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManagerPrice;
