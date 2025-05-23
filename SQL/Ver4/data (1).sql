﻿-- 1. Chèn dữ liệu vào bảng Role
INSERT INTO Role (title) VALUES
('Admin'),
('User'),
('Customer'),
('Manager'),
('Sales Staff'),
('Delivery Staff');

-- 2. Chèn dữ liệu vào bảng Users
INSERT INTO Users (username, password, roleID, email, phonecontact) VALUES
('admin', 'admin123', 1, 'admin@example.com', '1234567890'),
('user1', 'user123', 3, 'user1@example.com', '0987654321'),
('user2', 'user123', 3, 'user2@example.com', '1122334455'),
('manager', 'manager123', 4, 'manager@example.com', '2233445566'),
('salesstaff', 'sales123', 5, 'sales@example.com', '3344556677');

-- 3. Chèn dữ liệu vào bảng Order_Status
INSERT INTO Order_Status (StatusName) VALUES
('Order Received'),
('Order Picked'),
('Order In Transit'),
('Out For Delivery'),
('Reached Destination');

-- 4. Chèn dữ liệu vào bảng Payment
INSERT INTO Payment (TotalPrice, PaymentStatus) VALUES
(1000000, 1),
(1500000, 0),
(2000000, 1),
(3000000, 1),
(2500000, 0);

-- 5. Chèn dữ liệu vào bảng Service
INSERT INTO Service (ServiceName, Price) VALUES
('Health Checking', 150000),
('Professional Packaging', 200000),
('Delivery Insurance', 500000);

-- 6. Chèn dữ liệu vào bảng Koi_Box
INSERT INTO Koi_Box (Price,BoxName, BoxSize) VALUES
(12000000.0,'Large Box (S01)', 5.0),
(700000.0,'Medium Box (S02)', 10.0),
(400000.0,'Small Box (S03)', 20.0);

-- 7. Chèn dữ liệu vào bảng Orders
INSERT INTO Orders (StartPlace, EndPlace, OrderDate, TotalPrice, userID, Order_StatusID, CustomsImageLink, PaymentID, ServiceID) VALUES
('Place A', 'Place B', '2024-10-01', 1500000, 1, 1, 'link_to_image1.jpg', 1, 1),
('Place C', 'Place D', '2024-10-02', 2000000, 2, 2, 'link_to_image2.jpg', 2, 1),
('Place E', 'Place F', '2024-10-03', 2500000, 3, 3, 'link_to_image3.jpg', 3, 1),
('Place G', 'Place H', '2024-10-04', 3000000, 4, 4, 'link_to_image4.jpg', 4, 1),
('Place I', 'Place J', '2024-10-05', 3500000, 5, 5, 'link_to_image5.jpg', 5, 1);

-- 8. Chèn dữ liệu vào bảng DeliveryMethod
INSERT INTO DeliveryMethod (methodName,price) VALUES
('Standard Delivery',300000),
('Express Delivery',850000);

-- 9. Chèn dữ liệu vào bảng Delivery
INSERT INTO Delivery (DeliveryMethodID, OrderID, Price, DeliveryStatus) VALUES
(1, 1, 10.0, 1),
(2, 2, 20.0, 0),
(1, 3, 10.0, 1),
(2, 4, 20.0, 0),
(2, 5, 10.0, 1);

-- 10. Chèn dữ liệu vào bảng Feedback
INSERT INTO Feedback (OrderID, FeedbackDescription, Rating) VALUES
(1, 'Dịch vụ tốt', 5),
(2, 'Giao hàng nhanh chóng', 4),
(3, 'Cần cải thiện chất lượng cá', 3),
(4, 'Rất hài lòng với dịch vụ', 5),
(5, 'Thời gian giao hàng hơi lâu', 2);

-- 11. Chèn dữ liệu vào bảng Koi_Fish
INSERT INTO Koi_Fish (Weight, OrderID, CertificateImageLink, FishStatus, BoxID, KoiCategories) VALUES
(1.5, 1, 'link_to_certificate1.jpg', 'Healthy', 1, 'Koi 1'),
(2.0, 1, 'link_to_certificate2.jpg', 'Healthy', 2, 'Koi 2'),
(1.8, 2, 'link_to_certificate3.jpg', 'Sick', 1, 'Koi 3'),
(2.5, 3, 'link_to_certificate4.jpg', 'Healthy', 1, 'Koi 4'),
(3.0, 4, 'link_to_certificate5.jpg', 'Healthy', 2, 'Koi 5');
