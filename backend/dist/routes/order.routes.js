"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, order_controller_1.createOrder);
router.get("/my-orders", auth_middleware_1.authenticate, order_controller_1.getMyOrders);
exports.default = router;
