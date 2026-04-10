-- 1. Create Customers table
CREATE TABLE customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE
);

-- 2. Create Products table - includes the Category column required by the frontend
CREATE TABLE products (
    ProductID INT PRIMARY KEY,
    Name NVARCHAR(100),
    Category NVARCHAR(50), 
    Price DECIMAL(10, 2),
    Description NVARCHAR(MAX),
    ImageURL NVARCHAR(MAX)
);

-- 3. Create Purchases/Orders table - for use in Phase 2
CREATE TABLE purchases (
    PurchaseID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT FOREIGN KEY REFERENCES customers(CustomerID),
    ProductID INT FOREIGN KEY REFERENCES products(ProductID),
    Quantity INT,
    PurchaseDate DATETIME DEFAULT GETDATE()
);

-- 4. Insert 3 basic AirPods records
INSERT INTO products (ProductID, Name, Category, Price, Description, ImageURL) VALUES 
(1, 'AirPods 3', 'Earbuds', 179, 'The next evolution of sound and comfort.', 'https://productsimage.blob.core.windows.net/product-images/AirPods3.png?sp=r&st=2026-04-03T01:20:49Z&se=2026-04-24T09:35:49Z&spr=https&sv=2024-11-04&sr=b&sig=BCJvXxm3r0M9p2UYSV7kszvXMYPCSsue16pYRX1GbKo%3D'),
(2, 'AirPods 4', 'Earbuds', 249, 'Active Noise Cancellation. The next evolution of sound, comfort and noise control.', 'https://productsimage.blob.core.windows.net/product-images/AirPods4.png?sp=r&st=2026-04-03T01:24:17Z&se=2026-04-24T09:39:17Z&spr=https&sv=2024-11-04&sr=b&sig=459BeFQ0Jmz2hnX2njzKRoJfseDsnqqIujkri4Fpp5Q%3D'),
(3, 'AirPods Pro 3', 'Earbuds', 329, 'Next-level active noise cancellation and immersive sound.', 'https://productsimage.blob.core.windows.net/product-images/AirPodsPro3.png?sp=r&st=2026-04-03T01:24:49Z&se=2026-04-24T09:39:49Z&spr=https&sv=2024-11-04&sr=b&sig=Wb7k%2B1lTp4CCYm3SjW%2FG45bE6QO4UkPyKBNCQWU8cDM%3D');
(3, 'AirPods Max 2', 'Headphones', 799, 'The ultimate over ear personal listening experience.', ' https://productsimage.blob.core.windows.net/product-images/airpodsMax2.png?sp=r&st=2026-04-03T01:25:36Z&se=2026-04-24T09:40:36Z&spr=https&sv=2024-11-04&sr=b&sig=CdAhKVIdTUP9hDFrLJY%2Bi0wOrVlS8z%2BB6MvZkUC7Tis%3D');