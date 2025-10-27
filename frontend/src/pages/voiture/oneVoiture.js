// Read the selected voiture from the API and render its details
import { getDataOneVoiture } from "../../api/api.js";

function afficherVoiture(v) {
  const main = document.querySelector("main");
  if (!main) return;
  main.innerHTML = "";

  const container = document.createElement("div");
  container.className = "container d-flex align-items-start justify-content-center";
  container.style.minHeight = "70vh";
  container.style.paddingTop = "8vh";

  const row = document.createElement("div");
  row.className = "row justify-content-center w-100";

  const col = document.createElement("div");
  col.className = "col-12 col-md-8 col-lg-6";

  const card = document.createElement("div");
  card.className = "card shadow"

  if (v.photo) {
    const img = document.createElement("img");
    img.src = v.photo;
    img.alt = "Voiture";
    img.className = "card-img-top";
    card.appendChild(img);
  }

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = `${v.marque || ""} ${v.modele || ""}`.trim() || "Voiture";
  cardBody.appendChild(title);

  const info = document.createElement("p");
  info.className = "text-muted";
  info.textContent =
    "Marque: " + (v.marque || "-") +
    " • Modèle: " + (v.modele || "-") +
    " • Prix: " + (v.prix != null ? v.prix + " €" : "-");
  cardBody.appendChild(info);

  const desc = document.createElement("p");
  desc.className = "card-text";
  desc.textContent = v.description || "";
  cardBody.appendChild(desc);

  const back = document.createElement("a");
  back.href = "./voiture.html";
  back.textContent = "← Retour aux voitures";
  back.className = "btn btn-secondary mt-3";
  cardBody.appendChild(back);

  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);
  container.appendChild(row);

  main.appendChild(container);
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


