-- Create a staging table to receive the CSV data imported by Data Factory
CREATE TABLE RawShoppingData (
    TransactionID NVARCHAR(50),
    CustomerID NVARCHAR(50),
    Age NVARCHAR(50),
    Gender NVARCHAR(50),
    ItemPurchased NVARCHAR(255),
    Category NVARCHAR(100),
    PurchaseAmount_USD NVARCHAR(50),
    Season NVARCHAR(50),
    ReviewRating NVARCHAR(50)
);
