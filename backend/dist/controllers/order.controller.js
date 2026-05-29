"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyOrders = exports.createOrder = void 0;
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { artworkId } = req.body;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const artwork = yield prismaClient_1.default.artwork.findUnique({
            where: { id: artworkId },
        });
        if (!artwork) {
            return res.status(404).json({ error: "Artwork not found" });
        }
        const order = yield prismaClient_1.default.order.create({
            data: {
                userId,
                artworkId,
                totalPrice: artwork.price,
                status: "COMPLETED",
            },
        });
        res.status(201).json({
            message: "Purchase completed successfully",
            order,
        });
    }
    catch (error) {
        console.error("Order error:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
});
exports.createOrder = createOrder;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const orders = yield prismaClient_1.default.order.findMany({
            where: { userId },
            include: {
                artwork: true,
            },
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});
exports.getMyOrders = getMyOrders;
