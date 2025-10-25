import mongoose from "mongoose";
import { deleteVoiture, editVoiture, getAllVoiture } from "../models/voiture";
import { json } from "express";

// ##################################### Récuprer toutes les voitures #############################################

export async function getAllVoitureController(req, res) {
  const allVoitures = await getAllVoiture();

  if (allVoitures.length === 0) {
    res.status(400).json({ message: "La voiture n'existe pas" });
  }
  return res.status(200).json({ allVoitures });
}

// ##################################### Récuprer une voiture #############################################

export async function getOneVoitureController(req, res) {}

// ##################################### ajouter des voitures #############################################

export async function addVoitureController() {
  const addVoiture = await getAllVoiture();
  const voiture = addVoiture.find((v) => v.immatricullation == req.body.immatricullation);

  if (voiture){
    return res.status(200).json({message : "Ce modèle existe déjà !"})
  }

  if (
    !req.body.marque ||
    !req.body.modele ||
    !req.body.prix ||
    !req.body.description ||
    !req.body.photo
  ){
    return res.status(400).json({message : "Veuillez remplir tout les champs"});
  }

  const newVoiture = await addVoiture(req.body);
  return res.status(400).json({message : "La voiture à bien était ajoutée", voiture : newVoiture})
}

// ##################################### Suppr des voitures #############################################

export async function deleteVoitureController() {
    const delVoiture = await deleteVoiture().find((v) => v.id == id);
}

// ##################################### Modifier des voitures #############################################

export async function editVoitureController(req, res) {
    const id = req.params.immatricullation;
    const updateVoiture = req.body;

    const voiture = await editVoiture(id, updateVoiture);

    if(!voiture){
        return res.status(400).json({message : "Aucune modification faite"})
    }

    return res.status(400).json({message : "Voiture modifier"})
}
