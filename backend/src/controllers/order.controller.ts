import { Response } from "express";
import prisma from "../config/prismaClient";
import { AuthRequest } from "../middleware/auth.middleware";

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { artworkId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
    });

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    const order = await prisma.order.create({
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
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        artwork: true,
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};