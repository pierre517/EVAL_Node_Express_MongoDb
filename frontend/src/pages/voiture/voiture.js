import { getDataAllVoitures } from "../../api/api.js";

export async function displayAllVoiture() {
  const main = document.querySelector("main");
  main.classList.add("container", "my-4");

  const voitures = await getDataAllVoitures();

  const ligne = document.createElement("div");
  ligne.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3";

  voitures.forEach((voiture) => {
    const colonne = document.createElement("div");
    colonne.className = "col";

    const carte = document.createElement("div");
    carte.className = "card h-100 shadow-sm vehicle-card";

    if (voiture.photo) {
      const img = document.createElement("img");
      img.src = voiture.photo;
      img.alt = "Voiture";
      img.className = "card-img-top";
      carte.appendChild(img);
    }

    const corpsCarte = document.createElement("div");
    corpsCarte.className = "card-body d-flex flex-column";

    const titre = document.createElement("h5");
    titre.className = "card-title";
    titre.textContent = voiture.marque || voiture.modele || "Voiture";
    corpsCarte.appendChild(titre);

  // Renseignements en colonne
  const renseignements = document.createElement("div");
  renseignements.className = "renseignements text-muted";

  const ligneMarque = document.createElement("div");
  ligneMarque.textContent = `Marque: ${voiture.marque || '-'}`;
  renseignements.appendChild(ligneMarque);

  const ligneModele = document.createElement("div");
  ligneModele.textContent = `Modèle: ${voiture.modele || '-'}`;
  renseignements.appendChild(ligneModele);

  const lignePrix = document.createElement("div");
  lignePrix.textContent = `Prix: ${voiture.prix || '-'} €`;
  renseignements.appendChild(lignePrix);

  corpsCarte.appendChild(renseignements);

    const boutonVoir = document.createElement("button");
    boutonVoir.type = "button";
    boutonVoir.className = "btn btn-primary voir-btn";
    boutonVoir.textContent = "Voir";
    boutonVoir.addEventListener("click", () => {
      const id = voiture._id || voiture.id || "";
      window.location.href = `./oneVoiture.html?id=${encodeURIComponent(id)}`;
    });

    corpsCarte.appendChild(boutonVoir);
    carte.appendChild(corpsCarte);

    colonne.appendChild(carte);
    ligne.appendChild(colonne);
  });

  main.appendChild(ligne);
}

displayAllVoiture();
