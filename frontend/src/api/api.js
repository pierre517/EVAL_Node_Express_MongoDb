// ------------------voitures----------------------------//

export async function getDataAllVoitures() {
  const response = fetch("http://localhost:3000/voitures");
  const voitures = (await response).json();
  return voitures;
}

export async function getDataOneVoiture(id) {
  const response = fetch(`http://localhost:3000/voitures/${id}`);
  const voiture = (await response).json();
  return voiture;
}

// ---------------------------motos----------------------//

export async function getDataAllMotos() {
  const response = fetch("http://localhost:3000/motos");
  const motos = (await response).json();
  return motos;
}

export async function getDataOneMoto(id) {
  const response = fetch(`http://localhost:3000/motos/${id}`);
  const moto = (await response).json();
  return moto;
}
