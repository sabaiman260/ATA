import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getBrands = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const brands = await prisma.brand.findMany({
            where: {
                ...(search && {
                    name: {
                        contains: search,
                    },
                }),
            },
            include: {
                categories: {
                    include: {
                        series: true,
                    },
                },
            },
        });
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving brands" });
    }
};

export const getBrandById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { brandId } = req.params;
        const brand = await prisma.brand.findUnique({
            where: { id: brandId },
            include: {
                categories: { include: { series: true } },
            },
        });

        if (!brand) {
            res.status(404).json({ message: "Brand not found" });
            return;
        }

        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving brand" });
    }
};

export const createBrand = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, description } = req.body;
        const brand = await prisma.brand.create({ data: { name, description } });
        res.status(201).json(brand);
    } catch (error) {
        res.status(500).json({ message: "Error creating brand" });
    }
};

export const updateBrand = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { brandId } = req.params;
        const { name, description } = req.body;

        const brand = await prisma.brand.update({ 
            where: { id: brandId }, 
            data: { 
                ...(name && { name }),
                ...(description !== undefined && { description })
            } 
        });

        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: "Error updating brand" });
    }
};

export const deleteBrand = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { brandId } = req.params;

        // Check if brand has categories
        const categoriesCount = await prisma.category.count({
            where: { brandId },
        });

        if (categoriesCount > 0) {
            res.status(400).json({
                message: "Cannot delete brand with existing categories. Please delete categories first."
            });
            return;
        }

        await prisma.brand.delete({ where: { id: brandId } });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting brand" });
    }
};