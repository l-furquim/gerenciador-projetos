import express from "express";
import { 
  getAllDevelopers, 
  createDeveloper 
} from "../controllers/developerController.js";

const router = express.Router();

router.get("/", getAllDevelopers);
router.post("/", createDeveloper);

export default router;