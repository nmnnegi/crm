# Mini CRM - Backend Application

This is the backend application for the Mini CRM project, built with Node.js and Express.js. It provides APIs for managing customers, campaigns, and communication logs, and handles authentication and authorization.

## Features

- User Authentication and Authorization
- Customer Management
- Campaign Management
- Bulk Messaging
- Communication Log Tracking

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Axios for HTTP requests

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/yuvihere23/Mini-CRM/tree/main/BackEnd
``` 
2. Navigate to Backend Directory
```bash
   cd Mini-CRM/BackEnd
```
3.Install Dependencies
```bash
    npm install
```
4.Create a .env file in the root of the Backend directory and add your environment variables:
```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
```

### Running the Server
To start the development server
```bash
    npm run start
```



## API End Points

### Authentication

#### Login User

```http
POST /api/auth/login
```
 ```http
POST /api/auth/signup
```
#### Customers

```http
POST /api/customer/create
```
```http
GET /api/customer/getCustomerCount
```
#### Orders
```http
POST /api/order/create
```
```http
GET /api/order/count
```
#### Campaign Management
```http
POST /api/campaigns/create
```
```http
POST /api/campaigns/send/:campaignId
```
```http
GET /api/campaigns/get/:campaignId
```
```http
GET /api/campaigns/audience-size/:campaignId
```
```http
GET /api/campaigns/list
```
#### Communication Logs
```http
GET /api/communications/send/logs/:campaignId
```
```http
GET /api/communications/logs
```
#### Vendor Api
```http
POST /api/vendor/send-bulk-messages
```
```http
POST /api/vendor/delivery-receipt
```








