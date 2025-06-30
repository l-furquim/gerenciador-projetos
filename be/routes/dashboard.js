import express from "express";
import { 
  getDashboardStats, 
  getDashboardChartData 
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/chart-data", getDashboardChartData);

export default router;