import express from "express";
import * as questionController from "../controllers/questionController";
const router = express.Router();

router.post("/", questionController.saveAnswers);
router.get("/score/:userId", questionController.calculateDimensionAverages);

export default router;