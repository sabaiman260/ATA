import { Router } from "express";
import multer from "multer";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";
import { uploadImage } from "../controllers/uploadController";

const upload = multer({ dest: "./uploads/" });

const router = Router();

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.post("/", createProduct);
router.post("/upload", upload.single("image"), uploadImage);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
