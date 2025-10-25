import mongoose from "mongoose";
const { Schema, model } = mongoose;

const motoSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  prix: Number,
  description: String,
  photo: String,
});

const Moto = mongoose.model("moto", motoSchema);
export default Moto;

// -----------------------------------------------//

export async function getAllMotos() {
  return await Moto.find();
}

// -----------------------------------------------//

export async function addMoto(moto) {
  try {
    await Moto.create(moto);
  } catch (error) {
    console.log(error);
  }
}

// ----------------------------------------------//

export async function deleteMoto(moto) {
  try {
    await Moto.deleteOne(moto);
  } catch (error) {
    console.log(error);
  }
  return true;
}

// ----------------------------------------------//

export async function updateMoto(motoId, updatedMoto) {
  try {
    const moto = await Moto.findByIdAndUpdate(
      motoId,
      {
        $set: {
          marque: updatedMoto.marque,
          modele: updatedMoto.modele,
          prix: updatedMoto.prix,
          description: updatedMoto.description,
          photo: updatedMoto.photo,
        },
      },
      { new: true }
    );
    return moto;
  } catch (error) {
    console.log(error);
  }
}

// --------------------------------------------------//

export async function getMoto(moto) {
  return await Moto.findById(moto);
}
