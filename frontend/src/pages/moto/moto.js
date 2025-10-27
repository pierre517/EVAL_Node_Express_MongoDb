import { getDataAllMotos } from "../../api/api.js";

export async function displayAllMoto() {
  const main = document.querySelector("main");
  
  main.classList.add("container", "my-4", "moto-page");

  const motos = await getDataAllMotos();

  const ligne = document.createElement("div");
  ligne.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3";

  motos.forEach((moto) => {
    const colonne = document.createElement("div");
    colonne.className = "col";

    const carte = document.createElement("div");
    carte.className = "card h-100 shadow-sm vehicle-card";

    if (moto.photo) {
      const img = document.createElement("img");
      img.src = moto.photo;
      img.alt = "Moto";
      img.className = "card-img-top";
      carte.appendChild(img);
    }

    const corpsCarte = document.createElement("div");
    corpsCarte.className = "card-body d-flex flex-column";

    const titre = document.createElement("h5");
    titre.className = "card-title";
    titre.textContent = moto.marque || moto.modele || "Moto";
    corpsCarte.appendChild(titre);

  const renseignements = document.createElement("div");
  renseignements.className = "renseignements text-muted";

  const ligneMarque = document.createElement("div");
  ligneMarque.textContent = `Marque: ${moto.marque || '-'}`;
  renseignements.appendChild(ligneMarque);

  const ligneModele = document.createElement("div");
  ligneModele.textContent = `Modèle: ${moto.modele || '-'}`;
  renseignements.appendChild(ligneModele);

  const lignePrix = document.createElement("div");
  lignePrix.textContent = `Prix: ${moto.prix || '-'} €`;
  renseignements.appendChild(lignePrix);

  corpsCarte.appendChild(renseignements);

    const boutonVoir = document.createElement("button");
    boutonVoir.type = "button";
    boutonVoir.className = "btn btn-primary voir-btn";
    boutonVoir.textContent = "Voir";
    boutonVoir.addEventListener("click", () => {
      const id = moto._id || moto.id || "";
      window.location.href = `./oneMoto.html?id=${encodeURIComponent(id)}`;
    });

    corpsCarte.appendChild(boutonVoir);
    carte.appendChild(corpsCarte);

    colonne.appendChild(carte);
    ligne.appendChild(colonne);
  });

  main.appendChild(ligne);
}

displayAllMoto();
