
export async function getDataAllVoitures() {
    const response = fetch("http://localhost:3000/voitures");
    const voitures = (await response).json();
    return voitures;
}