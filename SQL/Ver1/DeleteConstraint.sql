-- Alter the Orders foreign keys to enable cascading delete on related tables
ALTER TABLE Orders
    DROP CONSTRAINT FK_Orders_UserID;

ALTER TABLE Orders
    ADD CONSTRAINT FK_Orders_UserID FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE;

ALTER TABLE Orders
    DROP CONSTRAINT FK_Orders_OrderStatusID;

ALTER TABLE Orders
    ADD CONSTRAINT FK_Orders_OrderStatusID FOREIGN KEY (Order_StatusID) REFERENCES Order_Status(Order_StatusID);

ALTER TABLE Orders
    DROP CONSTRAINT FK_Orders_PaymentID;

ALTER TABLE Orders
    ADD CONSTRAINT FK_Orders_PaymentID FOREIGN KEY (PaymentID) REFERENCES Payment(PaymentID);

ALTER TABLE Orders
    DROP CONSTRAINT FK_Orders_ServiceID;

ALTER TABLE Orders
    ADD CONSTRAINT FK_Orders_ServiceID FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID);

-- Alter the Feedback table to enable cascading delete when an Order is deleted
ALTER TABLE Feedback
    DROP CONSTRAINT FK_Feedback_OrderID;

ALTER TABLE Feedback
    ADD CONSTRAINT FK_Feedback_OrderID FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE;

-- Alter the Delivery table to enable cascading delete when an Order is deleted
ALTER TABLE Delivery
    DROP CONSTRAINT FK_Delivery_OrderID;

ALTER TABLE Delivery
    ADD CONSTRAINT FK_Delivery_OrderID FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE;

-- Alter the Contain table to enable cascading delete when an Order is deleted
ALTER TABLE Contain
    DROP CONSTRAINT FK_Contain_OrderID;

ALTER TABLE Contain
    ADD CONSTRAINT FK_Contain_OrderID FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE;

ALTER TABLE Contain
    DROP CONSTRAINT FK_Contain_BoxID;

ALTER TABLE Contain
    ADD CONSTRAINT FK_Contain_BoxID FOREIGN KEY (BoxID) REFERENCES Koi_Box(BoxID);

-- Alter the Koi_Fish table to enable cascading delete when an Order is deleted
ALTER TABLE Koi_Fish
    DROP CONSTRAINT FK_KoiFish_OrderID;

ALTER TABLE Koi_Fish
    ADD CONSTRAINT FK_KoiFish_OrderID FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE;

ALTER TABLE Koi_Fish
    DROP CONSTRAINT FK_KoiFish_BoxID;

ALTER TABLE Koi_Fish
    ADD CONSTRAINT FK_KoiFish_BoxID FOREIGN KEY (BoxID) REFERENCES Koi_Box(BoxID);

-- Ensure that deleting a user will also delete related orders
ALTER TABLE Orders
    DROP CONSTRAINT FK_Orders_UserID;

ALTER TABLE Orders
    ADD CONSTRAINT FK_Orders_UserID FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE;
