import { Router } from "express";
import {
    createSeries,
    getSeries,
    getSeriesById,
    updateSeries,
    deleteSeries
} from "../controllers/seriesController";

const router = Router();

router.get("/", getSeries);
router.get("/:id", getSeriesById);
router.post("/", createSeries);
router.put("/:id", updateSeries);
router.delete("/:id", deleteSeries);

export default router;
