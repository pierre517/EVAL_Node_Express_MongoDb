import {
  addVoiture,
  deleteVoiture,
  editVoiture,
  getAllVoiture,
  getOneVoiture,
} from "../models/voiture.js";

// ##################################### Récuprer toutes les voitures #############################################

export async function getAllVoitureController(req, res) {
  const allVoitures = await getAllVoiture();

  if (allVoitures.length === 0) {
    res.status(400).json({ message: "il n'y a aucune voiture a présenter" });
  }
  return res.status(200).json(allVoitures);
}

// ##################################### Récuprer une voiture #############################################

export async function getOneVoitureController(req, res) {
  const id = req.params.id;
  const oneVoiture = getOneVoiture(id);

  if (!oneVoiture) {
    return res.status(400).json({ message: "cette voiture n'existe pas" });
  }

  return res.status(200).json(oneVoiture);
}

// ##################################### ajouter des voitures #############################################

export async function addVoitureController(req, res) {
  const allVoitures = await getAllVoiture();
  const voiture = allVoitures.find(
    (v) => v.immatriculation == req.body.immatriculation
  );

  if (voiture) {
    return res.status(400).json({ message: "Cette voiture existe déjà !" });
  }

  if (
    !req.body.marque ||
    !req.body.modele ||
    !req.body.prix ||
    !req.body.immatriculation ||
    !req.body.description ||
    !req.body.photo
  ) {
    return res
      .status(400)
      .json({ message: "Veuillez remplir tout les champs" });
  }

  const newVoiture = await addVoiture(req.body);
  return res
    .status(200)
    .json({ message: "La voiture à bien été ajoutée", voiture: newVoiture });
}

// ##################################### Suppr des voitures #############################################

export async function deleteVoitureController(req, res) {
  const allVoitures = await getAllVoiture();
  const voiture = allVoitures.find(
    (x) => x.immatriculation == req.body.immatriculation
  );

  if (!voiture) {
    return res.status(400).json({ message: "cette voiture n'existe pas" });
  }

  if (deleteVoiture(voiture)) {
    return res.status(200).json({ message: "voiture supprimée avec succes" });
  }
}

// ##################################### Modifier des voitures #############################################

export async function editVoitureController(req, res) {
  const id = req.params.id;
  const updateVoiture = req.body;

  const voiture = await editVoiture(id, updateVoiture);

  if (!voiture) {
    return res.status(400).json({ message: "cette voiture n'existe pas" });
  }

  return res
    .status(200)
    .json({ message: "Voiture modifier avec succes", voiture });
}
