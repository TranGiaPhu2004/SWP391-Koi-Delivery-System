import React from "react";
import { useNavigate } from "react-router-dom";
import "./Components/ManagerCustomer.css";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token lưu trong localStorage
    localStorage.removeItem("token"); // Giả sử bạn lưu JWT ở đây

    // Điều hướng người dùng về trang home bằng phương thức replace để ngăn việc quay lại trang trước
    navigate("/", { replace: true });
  };

  return (
    <button className="ManagerCustomer-logout" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
