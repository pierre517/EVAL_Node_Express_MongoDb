// ------------------voitures----------------------------//

export async function getDataAllVoitures() {
  const response = await fetch("http://localhost:3000/voitures");
  const voitures = await response.json();
  return voitures;
}

export async function getDataOneVoiture(id) {
  const response = await fetch(`http://localhost:3000/voitures/${id}`);
  const voiture = await response.json();
  return voiture;
}

export async function updateVoiture(id, data) {
  const response = await fetch(`http://localhost:3000/voitures/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function deleteVoitureByImmat(body) {
  const response = await fetch(`http://localhost:3000/voitures`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await response.json();
}

// ---------------------------motos----------------------//

export async function getDataAllMotos() {
  const response = await fetch("http://localhost:3000/motos");
  const motos = await response.json();
  return motos;
}

export async function getDataOneMoto(id) {
  const response = await fetch(`http://localhost:3000/motos/${id}`);
  const moto = await response.json();
  return moto;
}

export async function updateMoto(id, data) {
  const response = await fetch(`http://localhost:3000/motos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function deleteMotoByImmat(body) {
  const response = await fetch(`http://localhost:3000/motos`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await response.json();
}
