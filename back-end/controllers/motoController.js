import {
  getAllmotos,
  addMoto,
  deleteMoto,
  updateMoto,
  getMoto,
} from "../models/moto.js";

// --------------------------------------------------------//

export async function getAllMotosController(req, res) {
  const allMotos = await getAllmotos();

  if (allMotos.length === 0) {
    return res
      .status(400)
      .json({ message: "il n'y a aucune moto à présenter" });
  }

  return res.status(200).json(allMotos);
}

// --------------------------------------------------------//

export async function addMotoController(req, res) {
  const allMotos = await getAllmotos();
  const moto = allMotos.find(
    (x) => x.immatriculation == req.body.immatriculation
  );

  if (moto) {
    return res.status(400).json({ message: "cette moto existe déjà" });
  }

  if (
    !req.body.marque ||
    !req.body.modele ||
    !req.body.prix ||
    !req.body.description ||
    !req.body.photo ||
    !req.body.immatriculation
  ) {
    return res
      .status(400)
      .json({ message: "vous devez remplir tous les champs" });
  }

  const newMoto = await addMoto(req.body);
  return res
    .status(200)
    .json({ message: "moto ajoutée avec succes", moto: newMoto });
}

// ----------------------------------------------------------//

export async function deleteMotoController(req, res) {
  const allMotos = await getAllmotos();
  const moto = allMotos.find(
    (x) => x.immatriculation == req.body.immatriculation
  );

  if (!moto) {
    return res.status(400).json({ message: "cette voiture n'existe pas" });
  }

  if (deleteMoto(moto)) {
    return res.status(200).json({ message: "moto supprimée avec succes" });
  }
}

// --------------------------------------------------------//

export async function updateMotoController(req, res) {
  const id = req.params.id;
  const updatedMoto = req.body;

  const moto = await updateMoto(id, updatedMoto);

  if (!moto) {
    return res.status(400).json({ message: "cette moto n'existe pas" });
  }

  return res.status(200).json({ message: "moto modifiée avec succes", moto });
}

// ------------------------------------------------------------//

export async function getMotoByIdController(req, res) {
  const id = req.params.id;
  const moto = await getMoto(id);

  if (!moto) {
    return res.status(400).json({ message: "cette moto n'existe pas" });
  }

  return res.status(200).json(moto);
}
