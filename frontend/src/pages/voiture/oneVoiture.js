// Read the selected voiture from the API and render its details
import { getDataOneVoiture } from "../../api/api.js";

function afficherVoiture(v) {
  const main = document.querySelector("main");
  if (!main) return;
  main.innerHTML = "";

  const card = document.createElement("div");
  card.className = "vehicule-card";

  const title = document.createElement("h2");
  title.textContent = `${v.marque || ""} ${v.modele || ""}`.trim() || "Voiture";
  card.appendChild(title);

  const info = document.createElement("p");
  info.textContent =
    "Marque: " + (v.marque || "-") +
    " • Modèle: " + (v.modele || "-") +
    " • Prix: " + (v.prix != null ? v.prix + " €" : "-");
  card.appendChild(info);

  if (v.photo) {
    const img = document.createElement("img");
    img.src = v.photo;
    img.alt = "Voiture";
    img.style.maxWidth = "100%";
    card.appendChild(img);
  }

    const desc = document.createElement("p");
    desc.textContent = v.description;
    card.appendChild(desc);


  const back = document.createElement("a");
  back.href = "./voiture.html";
  back.textContent = "← Retour aux voitures";
  back.className = "btn btn-secondary mt-3";
  card.appendChild(back);

  main.appendChild(card);
}

function initVoiture() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const main = document.querySelector("main");

  if (!main) return;

  if (!id) {
    main.innerHTML = "<p class='text-danger'>Aucune voiture sélectionnée.</p>";
    return;
  }

  getDataOneVoiture(id)
    .then((voiture) => {
      if (!voiture) {
        main.innerHTML = "<p class='text-danger'>Voiture introuvable.</p>";
        return;
      }
      afficherVoiture(voiture);
    })
    .catch((err) => {
      console.error(err);
      main.innerHTML = "<p class='text-danger'>Erreur lors de la récupération de la voiture.</p>";
    });
}

initVoiture();


