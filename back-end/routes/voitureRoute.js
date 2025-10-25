import { Router } from "express";
import { addVoitureController, deleteVoitureController, editVoitureController, getAllVoitureController, getOneVoitureController } from "../controllers/voitureController";


const router = Router();

// ================= GET =====================
router.get("/voiture", getAllVoitureController);
router.get("/voiture", getOneVoitureController);

// ================= POST ====================
router.post("/voiture", addVoitureController);

// ================= DELETE ===================
router.delete("/voiture", deleteVoitureController);

// ================= PUT ======================
router.put("/voiture/:id", editVoitureController);

export default router;