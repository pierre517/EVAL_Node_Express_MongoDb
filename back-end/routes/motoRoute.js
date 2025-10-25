import { Router } from "express";
import {getAllMotosController, getMotoByIdController, addMotoController, deleteMotoController, updateMotoController } from "../controllers/motoController.js";


const router = Router();

// ================= GET =====================
router.get("/", getAllMotosController );
router.get("/", getMotoByIdController);

// ================= POST ====================
router.post("/", addMotoController );

// ================= DELETE ===================
router.delete("/", deleteMotoController );

// ================= PUT ======================
router.put("/:id", updateMotoController );

export default router;