
export async function getDataAllVoitures() {
    const response = fetch("http://localhost:3000/voitures");
    const voitures = (await response).json();
    return voitures;
}

export async function  getDataOneVoiture(id) {
    const response = fetch(`http://localhost:3000/voitures/${id}`);
    const voiture = (await response).json();
    return voiture;
}