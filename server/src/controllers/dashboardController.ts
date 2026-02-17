import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.product.findMany({ take: 15 });
    const salesSummary: any[] = [];
    const purchaseSummary: any[] = [];
    const expenseSummary: any[] = [];
    const expenseByCategorySummary: any[] = [];

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
