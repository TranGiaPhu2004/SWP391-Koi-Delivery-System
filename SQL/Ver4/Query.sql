SELECT *
FROM DeliveryMethod

SELECT SUM(c.price)
FROM Contain c
JOIN Orders o ON c.orderID = o.orderID
WHERE MONTH(o.orderDate) = 11
AND YEAR(o.orderDate) = 2024
AND c.boxID = 1