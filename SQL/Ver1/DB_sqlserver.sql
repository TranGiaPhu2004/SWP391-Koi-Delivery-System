CREATE TABLE Role (
  roleID INT PRIMARY KEY IDENTITY(1, 1),
  title VARCHAR(100)
);

CREATE TABLE Users (
  userID INT PRIMARY KEY IDENTITY(1, 1),
  username VARCHAR(100) UNIQUE, -- Đảm bảo username là duy nhất
  password VARCHAR(100),
  roleID INT,
  email VARCHAR(100) UNIQUE, -- Đảm bảo email là duy nhất
  phonecontact VARCHAR(20),
  FOREIGN KEY (roleID) REFERENCES Role(roleID)
);

CREATE TABLE Order_Status (
  Order_StatusID INT PRIMARY KEY IDENTITY(1, 1),
  StatusName VARCHAR(100)
);

CREATE TABLE Koi_Box (
  BoxID INT PRIMARY KEY IDENTITY(1, 1),
  Price FLOAT,
  BoxSize FLOAT
);

CREATE TABLE Payment (
  PaymentID INT PRIMARY KEY IDENTITY(1, 1),
  TotalPrice FLOAT,
  PaymentStatus BIT
);

CREATE TABLE Service (
  ServiceID INT PRIMARY KEY IDENTITY(1, 1),
  ServiceName VARCHAR(100),
  Price FLOAT
);

CREATE TABLE Orders (
  OrderID INT PRIMARY KEY IDENTITY(1, 1),
  StartPlace VARCHAR(100),
  EndPlace VARCHAR(100),
  OrderDate DATE,
  TotalPrice FLOAT,
  userID INT,
  Order_StatusID INT,
  CustomsImageLink VARCHAR(255),
  PaymentID INT,
  ServiceID INT,
  FOREIGN KEY (userID) REFERENCES Users(userID),  -- Cập nhật tham chiếu
  FOREIGN KEY (Order_StatusID) REFERENCES Order_Status(Order_StatusID),
  FOREIGN KEY (PaymentID) REFERENCES Payment(PaymentID),
  FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID)
);

CREATE TABLE DeliveryMethod (
  deliveryMethodID INT PRIMARY KEY IDENTITY(1, 1),
  methodName VARCHAR(100) NOT NULL -- Tên phương thức giao hàng
);

CREATE TABLE Delivery (
  DeliveryID INT PRIMARY KEY IDENTITY(1, 1),
  OrderID INT,
  DeliveryMethodID INT,
  Price FLOAT NOT NULL,
  DeliveryStatus BIT,
  FOREIGN KEY (DeliveryMethodID) REFERENCES DeliveryMethod(deliveryMethodID),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE TABLE Feedback (
  FeedbackID INT PRIMARY KEY IDENTITY(1, 1),
  OrderID INT,
  FeedbackDescription NVARCHAR(1000),  -- NVARCHAR(1000) để hỗ trợ tiếng Việt
  Rating INT,
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE TABLE Koi_Fish (
  FishID INT PRIMARY KEY IDENTITY(1, 1),
  Weight FLOAT,
  OrderID INT,
  CertificateImageLink VARCHAR(255),
  FishStatus VARCHAR(100),
  BoxID INT,
  KoiCategories VARCHAR(100),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (BoxID) REFERENCES Koi_Box(BoxID)
);

-- Bảng Contain lưu thông tin số lượng box trong đơn hàng
CREATE TABLE Contain (
  OrderID INT,  -- Tham chiếu đến bảng Orders
  BoxID INT,    -- Tham chiếu đến bảng Koi_Box
  Quantity INT, -- Số lượng box trong đơn hàng
  PRIMARY KEY (OrderID, BoxID), -- Cặp khóa chính đại diện cho mối quan hệ nhiều-nhiều
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID), -- Khóa ngoại đến Orders
  FOREIGN KEY (BoxID) REFERENCES Koi_Box(BoxID)     -- Khóa ngoại đến Koi_Box
);
