import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import customerRoutes from './routes/customer.route.js';
import orderRoutes from './routes/order.route.js';
import bodyParser from 'body-parser';
import campaignRoutes from './routes/campain.route.js';
import communicationLogRoutes from './routes/communicationLogs.route.js';
import vendorRoutes from './routes/vendorApi.route.js';


const app = express();
// Update to allow all origins during development
const allowedOrigins = [
  "http://localhost:5173",
  "https://crm-seven-steel.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add cookie parser middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/communications', communicationLogRoutes);
app.use('/api/vendor', vendorRoutes);




export { app };