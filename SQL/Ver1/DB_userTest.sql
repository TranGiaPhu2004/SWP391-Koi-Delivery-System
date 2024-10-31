-- Thêm dữ liệu vào bảng Koi_Box
INSERT INTO Koi_Box (Price, BoxSize) VALUES
(100.0, 5.0),
(150.0, 10.0),
(200.0, 20.0);

-- Thêm dữ liệu vào bảng Order_Status
INSERT INTO Order_Status (StatusName) VALUES
('Đã xác nhận'),
('Chưa xác nhận'),
('Đã lấy cá'),
('Đã giao'),
('Hoàn thành đơn hàng');

-- Thêm dữ liệu vào bảng Role
INSERT INTO Role (title) VALUES
('Admin'),
('User'),
('Customer'),
('Manager'),
('Sales Staff'),
('Delivery Staff');

-- Thêm dữ liệu vào bảng Users
INSERT INTO Users (username, password, roleID, email, phonecontact) VALUES
('admin', 'admin123', 1, 'admin@example.com', '1234567890'),
('user1', 'user123', 3, 'user1@example.com', '0987654321'),
('user2', 'user123', 3, 'user2@example.com', '1122334455'),
('manager', 'manager123', 4, 'manager@example.com', '2233445566'),
('salesstaff', 'sales123', 5, 'sales@example.com', '3344556677');

-- Thêm dữ liệu vào bảng Payment
INSERT INTO Payment (TotalPrice, PaymentStatus) VALUES
(100.0, 1),
(150.0, 0),
(200.0, 1),
(300.0, 1),
(250.0, 0);

-- Thêm dữ liệu vào bảng Orders
INSERT INTO Orders (StartPlace, EndPlace, OrderDate, TotalPrice, userID, Order_StatusID, CustomsImageLink, PaymentID, ServiceID) VALUES
('Place A', 'Place B', '2024-10-01', 150.0, 1, 1, 'link_to_image1.jpg', 1, 1),
('Place C', 'Place D', '2024-10-02', 200.0, 2, 2, 'link_to_image2.jpg', 2, 1),
('Place E', 'Place F', '2024-10-03', 250.0, 3, 3, 'link_to_image3.jpg', 3, 1),
('Place G', 'Place H', '2024-10-04', 300.0, 4, 4, 'link_to_image4.jpg', 4, 1),
('Place I', 'Place J', '2024-10-05', 350.0, 5, 5, 'link_to_image5.jpg', 5, 1);

-- Thêm dữ liệu vào bảng DeliveryMethod
INSERT INTO DeliveryMethod (methodName) VALUES
('Standard Delivery'),
('Express Delivery');

-- Thêm dữ liệu vào bảng Delivery
INSERT INTO Delivery (DeliveryMethodID, OrderID, Price, DeliveryStatus) VALUES
(1, 1, 10.0, 1),
(2, 2, 20.0, 0),
(1, 3, 10.0, 1),
(2, 4, 20.0, 0),
(2, 5, 10.0, 1);

-- Thêm dữ liệu vào bảng Service
INSERT INTO Service (ServiceName, Price) VALUES
('Health Check', 75.0);

-- Thêm dữ liệu vào bảng Feedback
INSERT INTO Feedback (OrderID, FeedbackDescription, Rating) VALUES
(1, 'Dịch vụ tốt', 5),
(2, 'Giao hàng nhanh chóng', 4),
(3, 'Cần cải thiện chất lượng cá', 3),
(4, 'Rất hài lòng với dịch vụ', 5),
(5, 'Thời gian giao hàng hơi lâu', 2);

-- Thêm dữ liệu vào bảng Koi_Fish
INSERT INTO Koi_Fish (Weight, OrderID, CertificateImageLink, FishStatus, BoxID, KoiCategories) VALUES
(1.5, 1, 'link_to_certificate1.jpg', 'Healthy', 1, 'Koi 1'),
(2.0, 1, 'link_to_certificate2.jpg', 'Healthy', 2, 'Koi 2'),
(1.8, 2, 'link_to_certificate3.jpg', 'Sick', 1, 'Koi 3'),
(2.5, 3, 'link_to_certificate4.jpg', 'Healthy', 1, 'Koi 4'),
(3.0, 4, 'link_to_certificate5.jpg', 'Healthy', 2, 'Koi 5');
