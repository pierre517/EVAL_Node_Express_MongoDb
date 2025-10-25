import mongoose from "../config/database.js";
const { Schema, model } = mongoose;

const voitureShema = new mongoose.Schema({
  marque: String,
  modele: String,
  prix: Number,
  immatricullation: String,
  description: String,
  photo: String,
});

const Voiture = mongoose.model("voiture", voitureShema);
export default Voiture;

// ##################################### Récuprer toutes les voitures #############################################

export async function getAllVoiture() {
  try {
    return await Voiture.find();
  } catch (error) {
    console.log(error);
  }
}

// ##################################### Récuprer une voiture #############################################

export async function getOneVoiture(id){
    try {
        return await Voiture.findById(id)
    } catch (error) {
        console.log(error);
    }
}

// ##################################### Ajouter une voiture ######################################################

export async function addVoiture(newVoiture) {
  try {
    return await Voiture.create(newVoiture);
  } catch (error) {
    console.log(error);
  }
}

// ##################################### Delete une voiture ########################################################

export async function deleteVoiture(voiture) {
  try {
    return await Pilote.deleteOne(voiture);
  } catch (error) {
    console.log(error);
  }
}

// ##################################### Put une voiture ########################################################

export async function editVoiture(voitureId, update) {
  try {
    const newVoiture = Voiture.findByIdAndUpdate(
      voitureId,
      {
        set: {
          marque: update.marque,
          modele: update.modele,
          prix: update.prix,
          immatricullation: update.immatricullation,
          description: update.description,
          photo: update.photo,
        },
      },
      { new: true }
    );
    return newVoiture;
  } catch (error) {
    console.log(error);
  }
}
