import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const seriesId = req.query.seriesId?.toString();

    const products = await prisma.product.findMany({
      where: {
        ...(search && { name: { contains: search } }),
        ...(seriesId && { seriesId }),
      },
      include: { brand: true, series: true },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { brand: true, series: true },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, brandId, seriesId, purchasePrice, sellingPrice } = req.body;

    const product = await prisma.product.create({
      data: { name, brandId, seriesId, purchasePrice: Number(purchasePrice) || 0, sellingPrice: Number(sellingPrice) || 0 },
      include: { brand: true, series: true },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { name, brandId, seriesId, purchasePrice, sellingPrice } = req.body;

    const product = await prisma.product.update({
      where: { id: productId },
      data: { name, ...(brandId && { brandId }), ...(seriesId && { seriesId }), ...(purchasePrice !== undefined && { purchasePrice: Number(purchasePrice) }), ...(sellingPrice !== undefined && { sellingPrice: Number(sellingPrice) }) },
      include: { brand: true, series: true },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;

    await prisma.product.delete({ where: { id: productId } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
