import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getModels = async (
    req: Request,
    res: Response
): Promise<void> => {
    // The current Prisma schema does not define a `Model` entity.
    // Return empty result to keep API stable until schema/controllers are synchronized.
    res.json([]);
};

export const getModelById = async (
    req: Request,
    res: Response
): Promise<void> => {
    res.status(501).json({ message: "Model entity not available in current schema" });
};

export const createModel = async (
    req: Request,
    res: Response
): Promise<void> => {
    res.status(501).json({ message: "Model entity not available in current schema" });
};

export const updateModel = async (
    req: Request,
    res: Response
): Promise<void> => {
    res.status(501).json({ message: "Model entity not available in current schema" });
};

export const deleteModel = async (
    req: Request,
    res: Response
): Promise<void> => {
    res.status(501).json({ message: "Model entity not available in current schema" });
};