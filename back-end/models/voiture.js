import mongoose from "../config/database.js";
const { Schema, model } = mongoose;

const voitureShema = new mongoose.Schema({
  marque: String,
  modele: String,
  prix: Number,
  description: String,
  photo: String,
});

const Voiture = mongoose.model("voiture", voitureShema);
export default Voiture;

// ##################################### Récuprer toutes les voitures #############################################

export async function getAllVoiture() {
  return await Voiture.find();
}

// ##################################### Ajouter une voiture ######################################################

export async function addVoiture(newVoiture) {
  return await Voiture.create(newVoiture);
}

// ##################################### Delete une voiture ########################################################

export async function deleteVoiture(voiture) {
  return await Pilote.deleteOne(voiture);
}

// ##################################### Put une voiture ########################################################

export async function editVoiture(voitureId, update) {
  const newVoiture =  Voiture.findByIdAndUpdate(
    voitureId,
    {
      set: {
        marque: update.marque,
        modele: update.modele,
        prix: update.prix,
        description: update.description,
        photo: update.photo,
      },
    },
    { new: true }
  );
  return newVoiture;
}
