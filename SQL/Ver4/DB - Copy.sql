
USE [SWP391]
GO
/****** Object:  Table [dbo].[Contain]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contain](
	[OrderID] [int] NOT NULL,
	[BoxID] [int] NOT NULL,
	[Quantity] [int] NULL,
	[Price] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC,
	[BoxID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Delivery]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Delivery](
	[DeliveryID] [int] IDENTITY(1,1) NOT NULL,
	[OrderID] [int] NULL,
	[DeliveryMethodID] [int] NULL,
	[Price] [float] NOT NULL,
	[DeliveryStatus] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[DeliveryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DeliveryMethod]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DeliveryMethod](
	[deliveryMethodID] [int] IDENTITY(1,1) NOT NULL,
	[methodName] [varchar](100) NOT NULL,
	[price] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[deliveryMethodID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[FeedbackID] [int] IDENTITY(1,1) NOT NULL,
	[OrderID] [int] NULL,
	[FeedbackDescription] [nvarchar](1000) NULL,
	[Rating] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[FeedbackID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Koi_Box]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Koi_Box](
	[BoxID] [int] IDENTITY(1,1) NOT NULL,
	[BoxName] [nvarchar](100) NULL,
	[Price] [float] NULL,
	[BoxSize] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[BoxID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Koi_Fish]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Koi_Fish](
	[FishID] [int] IDENTITY(1,1) NOT NULL,
	[Weight] [float] NULL,
	[OrderID] [int] NULL,
	[CertificateImageLink] [varchar](255) NULL,
	[FishStatus] [varchar](100) NULL,
	[BoxID] [int] NULL,
	[KoiCategories] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[FishID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_Status]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Status](
	[Order_StatusID] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Order_StatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[StartPlace] [varchar](100) NULL,
	[EndPlace] [varchar](100) NULL,
	[OrderDate] [date] NULL,
	[CompleteDate] [date] NULL,
	[TotalPrice] [float] NULL,
	[userID] [int] NULL,
	[Order_StatusID] [int] NULL,
	[CustomsImageLink] [varchar](255) NULL,
	[PaymentID] [int] NULL,
	[ServiceID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[PaymentID] [int] IDENTITY(1,1) NOT NULL,
	[TotalPrice] [float] NULL,
	[PaymentStatus] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[PaymentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[roleID] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[roleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Service]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Service](
	[ServiceID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceName] [varchar](100) NULL,
	[Price] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/19/2024 11:11:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](100) NULL,
	[password] [varchar](100) NULL,
	[roleID] [int] NULL,
	[email] [varchar](100) NULL,
	[phonecontact] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (6, 1, 1, 12000000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (6, 2, 1, 700000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (6, 3, 1, 400000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (7, 1, 1, 12000000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (7, 2, 1, 700000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (7, 3, 1, 400000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (8, 1, 1, 12000000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (8, 2, 1, 700000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (8, 3, 1, 400000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (9, 1, 0, 1200000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (9, 2, 1, 700000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (9, 3, 1, 400000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (10, 1, 0, 1200000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (10, 2, 1, 700000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (10, 3, 1, 400000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (11, 1, 0, 1200000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (11, 2, 1, 700000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (11, 3, 1, 400000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (12, 1, 0, 1200000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (12, 2, 1, 700000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (12, 3, 0, 400000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (13, 1, 1, 1200000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (13, 2, 1, 700000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (13, 3, 0, 400000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (15, 1, 0, 1200000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (15, 2, 1, 700000)
INSERT [dbo].[Contain] ([OrderID], [BoxID], [Quantity], [Price]) VALUES (15, 3, 1, 400000)
GO
SET IDENTITY_INSERT [dbo].[Delivery] ON 

INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (1, 1, 1, 10, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (2, 2, 2, 20, 0)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (3, 3, 1, 10, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (4, 4, 2, 20, 0)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (6, 6, 2, 14150000, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (7, 7, 2, 14450000, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (8, 8, 2, 14100000, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (9, 9, 2, 3250000, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (10, 10, 2, 3250000, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (11, 11, 2, 3250000, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (12, 12, 2, 1700000, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (13, 13, 1, 1550000, 1)
INSERT [dbo].[Delivery] ([DeliveryID], [OrderID], [DeliveryMethodID], [Price], [DeliveryStatus]) VALUES (15, 15, 2, 2900000, NULL)
SET IDENTITY_INSERT [dbo].[Delivery] OFF
GO
SET IDENTITY_INSERT [dbo].[DeliveryMethod] ON 

INSERT [dbo].[DeliveryMethod] ([deliveryMethodID], [methodName], [price]) VALUES (1, N'Standard Delivery', 300000)
INSERT [dbo].[DeliveryMethod] ([deliveryMethodID], [methodName], [price]) VALUES (2, N'Express Delivery', 850000)
SET IDENTITY_INSERT [dbo].[DeliveryMethod] OFF
GO
SET IDENTITY_INSERT [dbo].[Feedback] ON 

INSERT [dbo].[Feedback] ([FeedbackID], [OrderID], [FeedbackDescription], [Rating]) VALUES (1, 1, N'D?ch v? t?t', 5)
INSERT [dbo].[Feedback] ([FeedbackID], [OrderID], [FeedbackDescription], [Rating]) VALUES (2, 2, N'Giao hàng nhanh chóng', 4)
INSERT [dbo].[Feedback] ([FeedbackID], [OrderID], [FeedbackDescription], [Rating]) VALUES (3, 3, N'C?n c?i thi?n ch?t lư?ng cá', 3)
INSERT [dbo].[Feedback] ([FeedbackID], [OrderID], [FeedbackDescription], [Rating]) VALUES (4, 4, N'R?t hài l?ng v?i d?ch v?', 5)
SET IDENTITY_INSERT [dbo].[Feedback] OFF
GO
SET IDENTITY_INSERT [dbo].[Koi_Box] ON 

INSERT [dbo].[Koi_Box] ([BoxID], [BoxName], [Price], [BoxSize]) VALUES (1, N'Large Box (S01)', 1200000, 5)
INSERT [dbo].[Koi_Box] ([BoxID], [BoxName], [Price], [BoxSize]) VALUES (2, N'Medium Box (S02)', 700000, 10)
INSERT [dbo].[Koi_Box] ([BoxID], [BoxName], [Price], [BoxSize]) VALUES (3, N'Small Box (S03)', 400000, 20)
SET IDENTITY_INSERT [dbo].[Koi_Box] OFF
GO
SET IDENTITY_INSERT [dbo].[Koi_Fish] ON 

INSERT [dbo].[Koi_Fish] ([FishID], [Weight], [OrderID], [CertificateImageLink], [FishStatus], [BoxID], [KoiCategories]) VALUES (1, 1.5, 1, N'link_to_certificate1.jpg', N'Healthy', 1, N'Koi 1')
INSERT [dbo].[Koi_Fish] ([FishID], [Weight], [OrderID], [CertificateImageLink], [FishStatus], [BoxID], [KoiCategories]) VALUES (2, 2, 1, N'link_to_certificate2.jpg', N'Healthy', 2, N'Koi 2')
INSERT [dbo].[Koi_Fish] ([FishID], [Weight], [OrderID], [CertificateImageLink], [FishStatus], [BoxID], [KoiCategories]) VALUES (3, 1.8, 2, N'link_to_certificate3.jpg', N'Sick', 1, N'Koi 3')
INSERT [dbo].[Koi_Fish] ([FishID], [Weight], [OrderID], [CertificateImageLink], [FishStatus], [BoxID], [KoiCategories]) VALUES (4, 2.5, 3, N'link_to_certificate4.jpg', N'Healthy', 1, N'Koi 4')
INSERT [dbo].[Koi_Fish] ([FishID], [Weight], [OrderID], [CertificateImageLink], [FishStatus], [BoxID], [KoiCategories]) VALUES (5, 3, 4, N'link_to_certificate5.jpg', N'Healthy', 2, N'Koi 5')
SET IDENTITY_INSERT [dbo].[Koi_Fish] OFF
GO
SET IDENTITY_INSERT [dbo].[Order_Status] ON 

INSERT [dbo].[Order_Status] ([Order_StatusID], [StatusName]) VALUES (1, N'Order Received')
INSERT [dbo].[Order_Status] ([Order_StatusID], [StatusName]) VALUES (2, N'Order Picked')
INSERT [dbo].[Order_Status] ([Order_StatusID], [StatusName]) VALUES (3, N'Order In Transit')
INSERT [dbo].[Order_Status] ([Order_StatusID], [StatusName]) VALUES (4, N'Out For Delivery')
INSERT [dbo].[Order_Status] ([Order_StatusID], [StatusName]) VALUES (5, N'Reached Destination')
SET IDENTITY_INSERT [dbo].[Order_Status] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (1, N'45 Hang Bong Street, Hoan Kiem District, Hanoi', N'5 Hang Bong Street, Hoan Kiem District, Hanoi', CAST(N'2023-12-01' AS Date), 1500000, 1, 1, N'link_to_image1.jpg', 1, 1)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (2, N'45 Hang Bong Street, Hoan Kiem District, Hanoi', N'4 Hang Bong Street, Hoan Kiem District, Hanoi', CAST(N'2022-10-02' AS Date), 2000000, 2, 2, N'link_to_image2.jpg', 2, 1)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (3, N'4 Hang Bong Street, Hoan Kiem District, Hanoi', N'45 Hang Bong Street, Hoan Kiem District, Hanoi', CAST(N'2021-10-03' AS Date), 2500000, 3, 3, N'link_to_image3.jpg', 3, 1)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (4, N'5 Hang Bong Street, Hoan Kiem District, Hanoi', N'45 Hang Bong Street, Hoan Kiem District, Hanoi', CAST(N'2023-09-04' AS Date), 3000000, 4, 4, N'link_to_image4.jpg', 4, 1)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (6, N'123 Nguyen Trai Street, District 5, Ho Chi Minh City', N'13 Nguyen Trai Street, District 5, Ho Chi Minh City', CAST(N'2022-11-19' AS Date), 1415000, 2, 5, NULL, 6, 1)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (7, N'123 Nguyen Trai Street, District 5, Ho Chi Minh City', N'12 Nguyen Trai Street, District 5, Ho Chi Minh City', CAST(N'2024-11-19' AS Date), 1445000, 2, 5, NULL, 7, 3)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (8, N'123 Nguyen Trai Street, District 5, Ho Chi Minh City', N'12 Nguyen Trai Street, District 5, Ho Chi Minh City', CAST(N'2024-10-19' AS Date), 1410000, 2, 5, NULL, 8, 2)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (9, N'45 Hang Bong Street, Hoan Kiem District, Hanoi', N'4 Hang Bong Street, Hoan Kiem District, Hanoi', CAST(N'2022-01-19' AS Date), 3250000, 2, 5, NULL, 9, 3)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (10, N'45 Hang Bong Street, Hoan Kiem District, Hanoi', N'5 Hang Bong Street, Hoan Kiem District, Hanoi', CAST(N'2021-09-19' AS Date), 3250000, 2, 5, NULL, 10, 3)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (11, N'45 Hang Bong Street, Hoan Kiem District, Hanoi', N'4 Hang Bong Street, Hoan Kiem District, Hanoi', CAST(N'2023-01-19' AS Date), 3250000, 2, 5, NULL, 11, 3)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (12, N'42 Hang Bong Street, Hoan Kiem District, Hanoi', N'45 Hang Bong Street, Hoan Kiem District, Hanoi', CAST(N'2024-02-19' AS Date), 1700000, 2, 5, NULL, 12, 2)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (13, N'5 Hang Bong Street, Hoan Kiem District, Hanoi', N'45 Hang Bong Street, Hoan Kiem District, Hanoi', CAST(N'2024-07-19' AS Date), 1550000, 2, 5, NULL, 13, 2)
INSERT [dbo].[Orders] ([OrderID], [StartPlace], [EndPlace], [OrderDate], [TotalPrice], [userID], [Order_StatusID], [CustomsImageLink], [PaymentID], [ServiceID]) VALUES (15, N'32 Dien Bien Phu Street, Binh Thanh District, Ho Chi Minh City', N'322 Dien Bien Phu Street, Binh Thanh District, Ho Chi Minh City', CAST(N'2024-11-19' AS Date), 2900000, 2, 1, NULL, 15, 2)
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[Payment] ON 

INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (1, 1000000, 0)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (2, 1500000, 0)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (3, 2000000, 0)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (4, 3000000, 0)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (6, 1415000, 1)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (7, 1445000, 1)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (8, 1410000, 1)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (9, 3250000, 1)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (10, 3250000, 1)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (11, 3250000, 1)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (12, 1700000, 1)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (13, 1550000, 1)
INSERT [dbo].[Payment] ([PaymentID], [TotalPrice], [PaymentStatus]) VALUES (15, 2900000, 1)
SET IDENTITY_INSERT [dbo].[Payment] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([roleID], [title]) VALUES (1, N'Admin')
INSERT [dbo].[Role] ([roleID], [title]) VALUES (2, N'User')
INSERT [dbo].[Role] ([roleID], [title]) VALUES (3, N'Customer')
INSERT [dbo].[Role] ([roleID], [title]) VALUES (4, N'Manager')
INSERT [dbo].[Role] ([roleID], [title]) VALUES (5, N'Sales Staff')
INSERT [dbo].[Role] ([roleID], [title]) VALUES (6, N'Delivery Staff')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[Service] ON 

INSERT [dbo].[Service] ([ServiceID], [ServiceName], [Price]) VALUES (1, N'Health Checking', 150000)
INSERT [dbo].[Service] ([ServiceID], [ServiceName], [Price]) VALUES (2, N'Professional Packaging', 200000)
INSERT [dbo].[Service] ([ServiceID], [ServiceName], [Price]) VALUES (3, N'Delivery Insurance', 500000)
SET IDENTITY_INSERT [dbo].[Service] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([userID], [username], [password], [roleID], [email], [phonecontact]) VALUES (1, N'admin', N'admin123', 1, N'admin@example.com', N'1234567890')
INSERT [dbo].[Users] ([userID], [username], [password], [roleID], [email], [phonecontact]) VALUES (2, N'user1', N'user123', 3, N'user1@example.com', N'0987654321')
INSERT [dbo].[Users] ([userID], [username], [password], [roleID], [email], [phonecontact]) VALUES (3, N'user2', N'user123', 3, N'user2@example.com', N'1122334455')
INSERT [dbo].[Users] ([userID], [username], [password], [roleID], [email], [phonecontact]) VALUES (4, N'manager', N'manager123', 4, N'manager@example.com', N'2233445566')
INSERT [dbo].[Users] ([userID], [username], [password], [roleID], [email], [phonecontact]) VALUES (5, N'salesstaff', N'sales123', 5, N'sales@example.com', N'3344556677')
INSERT [dbo].[Users] ([userID], [username], [password], [roleID], [email], [phonecontact]) VALUES (6, N'Delivery', N'Deli@123', 6, N'Delivery@gmail.com', NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Koi_Box__EF47A55828901C37]    Script Date: 11/19/2024 11:11:55 AM ******/
ALTER TABLE [dbo].[Koi_Box] ADD UNIQUE NONCLUSTERED 
(
	[BoxName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__AB6E6164419D81D7]    Script Date: 11/19/2024 11:11:55 AM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__F3DBC57252642358]    Script Date: 11/19/2024 11:11:55 AM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Contain]  WITH CHECK ADD FOREIGN KEY([BoxID])
REFERENCES [dbo].[Koi_Box] ([BoxID])
GO
ALTER TABLE [dbo].[Contain]  WITH CHECK ADD FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Delivery]  WITH CHECK ADD FOREIGN KEY([DeliveryMethodID])
REFERENCES [dbo].[DeliveryMethod] ([deliveryMethodID])
GO
ALTER TABLE [dbo].[Delivery]  WITH CHECK ADD FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Koi_Fish]  WITH CHECK ADD FOREIGN KEY([BoxID])
REFERENCES [dbo].[Koi_Box] ([BoxID])
GO
ALTER TABLE [dbo].[Koi_Fish]  WITH CHECK ADD FOREIGN KEY([OrderID])
REFERENCES [dbo].[Orders] ([OrderID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([Order_StatusID])
REFERENCES [dbo].[Order_Status] ([Order_StatusID])
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([PaymentID])
REFERENCES [dbo].[Payment] ([PaymentID])
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([ServiceID])
REFERENCES [dbo].[Service] ([ServiceID])
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[Users] ([userID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([roleID])
REFERENCES [dbo].[Role] ([roleID])
GO
USE [master]
GO
ALTER DATABASE [SWP391] SET  READ_WRITE 
GO
