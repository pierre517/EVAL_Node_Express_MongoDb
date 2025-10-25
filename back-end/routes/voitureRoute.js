import { Router } from "express";
import { addVoitureController, deleteVoitureController, editVoitureController, getAllVoitureController, getOneVoitureController } from "../controllers/voitureController.js";


const router = Router();

// ================= GET =====================
router.get("/", getAllVoitureController);
router.get("/:id", getOneVoitureController);

// ================= POST ====================
router.post("/", addVoitureController);

// ================= DELETE ===================
router.delete("/", deleteVoitureController);

// ================= PUT ======================
router.put("/:id", editVoitureController);

export default router;