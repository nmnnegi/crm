# Mini CRM - Frontend Application

This is the frontend application for the Mini CRM project, built with React and Vite. It provides a user-friendly interface for managing customers, campaigns, and communication logs.

# Demo

Click [Here](https://crm-16b1.onrender.com) to see the live demo of the project

If Login didn't work for the firts time give it a second try and wait for it as its loading....

## Features

- User Authentication
- Customer Management
- Campaign Management
- Communication Log Tracking

## Technologies Used

- React
- Vite
- Tailwind CSS
- Axios

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Mini-CRM.git
   ```

2.Navigate to the Frontend Directory
   ```bash
   cd Mini-CRM/FrontEnd
   ```

3.Install dependencies
   ```bash
   npm install
```
4.Create a .env file in the root of the frontend directory and add your environment variables:
```bash
  VITE_FIREBASE_API_KEY=YOUR API KEY
  VITE_FIREBASE_AUTH_DOMAIN=YOUR AUTH DOMAin,
  VITE_FIREBASE_PROJECT_ID=YOUR PROJECT ID,
  VITE_FIREBASE_STORAGE_BUCKET=YOUR STORAGE BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID= YOUR MESSAGING SENDER ID,
  VITE_FIREBASE_APP_ID=YOUR APP ID

```
### Running the application
To start the development server
```bash
npm run dev
```







# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
