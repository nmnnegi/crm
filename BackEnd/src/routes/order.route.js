import express from "express";
import { createOrder,getOrderCount } from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/count", getOrderCount);


export default router;