import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createOrder, getMyOrders } from "../controllers/order.controller";

const router = Router();

router.post("/", authenticate, createOrder);
router.get("/my-orders", authenticate, getMyOrders);

export default router;