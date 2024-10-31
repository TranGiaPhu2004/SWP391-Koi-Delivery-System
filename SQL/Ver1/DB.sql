CREATE TABLE `Role` (
  `roleID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL
);

CREATE TABLE `User` (
  `userID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `roleID` INTEGER,
  `email` VARCHAR(100),
  `phonecontact` VARCHAR(20)
);

CREATE TABLE `Order_Status` (
  `Order_StatusID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `StatusName` VARCHAR(100) NOT NULL
);

CREATE TABLE `Orders` (
  `OrderID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `StartPlace` VARCHAR(100) NOT NULL,
  `EndPlace` VARCHAR(100) NOT NULL,
  `OrderDate` DATE NOT NULL,
  `TotalPrice` DOUBLE,
  `userID` INTEGER,
  `Order_StatusID` INTEGER,
  `CustomsImageLink` VARCHAR(255),
  `BoxID` INTEGER,
  `PaymentID` INTEGER,
  `DeliveryID` INTEGER,
  `ServiceID` INTEGER
);

CREATE TABLE `Feedback` (
  `FeedbackID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `OrderID` INTEGER,
  `FeedbackDescription` TEXT CHARACTER SET utf8mb4,
  `Rating` INTEGER
);

CREATE TABLE `Delivery` (
  `DeliveryID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `DeliveryMethod` VARCHAR(100) NOT NULL,
  `Price` DOUBLE NOT NULL,
  `DeliveryStatus` BOOLEAN
);

CREATE TABLE `Payment` (
  `PaymentID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `TotalPrice` DOUBLE NOT NULL,
  `PaymentStatus` BOOLEAN NOT NULL
);

CREATE TABLE `Service` (
  `ServiceID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `ServiceName` VARCHAR(100) NOT NULL,
  `Price` DOUBLE NOT NULL
);

CREATE TABLE `Koi_Box` (
  `BoxID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `Price` DOUBLE NOT NULL,
  `BoxSize` DOUBLE NOT NULL
);

CREATE TABLE `Koi_Fish` (
  `FishID` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `Weight` DOUBLE NOT NULL,
  `OrderID` INTEGER,
  `CertificateImageLink` VARCHAR(255),
  `FishStatus` VARCHAR(100),
  `BoxID` INTEGER,
  `KoiCategories` VARCHAR(100)
);

ALTER TABLE `Orders` ADD FOREIGN KEY (`userID`) REFERENCES `User` (`userID`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`Order_StatusID`) REFERENCES `Order_Status` (`Order_StatusID`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`BoxID`) REFERENCES `Koi_Box` (`BoxID`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`PaymentID`) REFERENCES `Payment` (`PaymentID`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`DeliveryID`) REFERENCES `Delivery` (`DeliveryID`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`ServiceID`) REFERENCES `Service` (`ServiceID`);

ALTER TABLE `Feedback` ADD FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`);

ALTER TABLE `Koi_Fish` ADD FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`);

ALTER TABLE `Koi_Fish` ADD FOREIGN KEY (`BoxID`) REFERENCES `Koi_Box` (`BoxID`);

ALTER TABLE `Role` ADD FOREIGN KEY (`roleID`) REFERENCES `User` (`roleID`);
