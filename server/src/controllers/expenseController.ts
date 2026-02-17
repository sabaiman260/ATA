import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // No expenseByCategory model in current schema; return empty array
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};
