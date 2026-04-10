# CST8912 Project - Phase 2: Cloud Backend Rebuild & Security Enhancements 🚀


## 📌 Project Overview
This repository contains the rebuilt backend infrastructure, database schema, and API codebase for Phase 1 of the Project. We have successfully re-established the data pipeline from Azure Blob Storage to Azure SQL Database, and connected our React frontend via a secured Azure Function API. 

A major focus of this rebuild was addressing the professor's feedback regarding **Database Security**. We have implemented enterprise-grade security measures to protect our data assets.

---

## 🛡️ Major Security Enhancements (Professor's Feedback Addressed)

To significantly improve the security posture of our database and backend architecture, the following methods were implemented during this rebuild:

### 1. Implementation of the "Principle of Least Privilege" (PoLP)
* **The Vulnerability:** Previously, the backend API connected to the database using the master Server Admin credentials. A compromised API would give hackers full control to drop tables or delete the entire database.
* **Our Solution:** We created a dedicated, restricted SQL user named `AppUser`. 
* **How it works:** Using T-SQL, we assigned `AppUser` strictly to the `db_datareader` and `db_datawriter` roles. This account can only execute `SELECT`, `INSERT`, and `UPDATE` queries. It explicitly lacks the permissions to execute `DROP` or `ALTER` commands, effectively neutralizing destructive SQL injection risks.

### 2. Elimination of Hardcoded Credentials
* **The Vulnerability:** Hardcoding database passwords inside the Node.js API source code (`index.js`).
* **Our Solution:** We migrated the connection string to **Azure Function Environment Variables** (`SqlConnectionString`). The source code now dynamically fetches the credentials via `process.env.SqlConnectionString`. The codebase is entirely free of sensitive passwords.

### 3. Strict CORS Policies
* **Our Solution:** Instead of allowing wildcard (`*`) access, the Azure Function CORS policy has been strictly whitelisted to only accept requests from our specific verified React Frontend URL: `https://ashy-mushroom-0fade9110.1.azurestaticapps.net`.

---

## 🏗️ System Architecture & Workflow Summary

Here is the step-by-step breakdown of the rebuilt data pipeline:

### Step 1: Azure SQL Database Setup
* Provisioned a new Azure SQL Server (`airpodserver-v2`) and Database (`AirpodsDB`).
* Configured the Server Firewall to allow Azure services and resources to access the server.
* Deployed the normalized schema (`customers`, `products`, `purchases`) and inserted seed data (AirPods) ensuring the `Category` column matches frontend logic perfectly.

### Step 2: Data Engineering (ELT Pipeline)
* **Source:** Uploaded the raw `shopping_trends.csv` flat file into an Azure Blob Storage container (`shopping-data`).
* **Pipeline:** Built an **Azure Data Factory (ADF)** Copy Pipeline. 
* **Sink:** Securely connected ADF to the SQL Database using the restricted `AppUser` account and loaded the data into a staging table (`RawShoppingData`).

### Step 3: Backend API Deployment (Azure Functions)
* Deployed a Node.js HTTP Trigger function named `GetProducts`.
* Installed necessary npm packages (`mssql`) via the Azure Console.
* The API successfully queries the `products` table and returns JSON payloads to the frontend.

### Step 4: Frontend Integration
* The React application successfully fetches product data using the new API URL. 
* All category filtering buttons (All, Earbuds, Headphones) are fully functional based on the newly designed database schema.

---

## 🗂️ Repository Structure


  * `01_security_setup.sql` *(Contains the PoLP AppUser creation script)*
  * `02_database_schema.sql` *(Normalized tables: customers, products, purchases)*
  * `03_staging_table.sql` *(Staging table for Data Factory)*
  * `shopping_trends.csv` *(Raw data source)*
  * `index.js` *(Node.js HTTP Trigger connecting securely to Azure SQL)*

---

