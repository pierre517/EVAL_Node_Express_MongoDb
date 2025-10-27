// Read the selected voiture from the API and render its details
import { getDataOneVoiture, updateVoiture } from "../../api/api.js";

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

  card.className = "card shadow has-edit-overlay";

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

  // Bouton Modifier
  const boutonModifier = document.createElement("button");
  boutonModifier.type = "button";
  boutonModifier.className = "btn btn-primary ms-2 mt-3";
  boutonModifier.textContent = "Modifier";
  cardBody.appendChild(boutonModifier);

  // Crée la carte de modification 
  function creerCarteEdition(voiture) {
  const carte = document.createElement("div");
  carte.className = "card shadow edit-card p-3";

    // Champ des formulaire
  const champMarque = document.createElement("input");
  champMarque.className = "form-control mb-2";
    champMarque.placeholder = "Marque";
    champMarque.value = voiture.marque;

  const champModele = document.createElement("input");
  champModele.className = "form-control mb-2";
    champModele.placeholder = "Modèle";
    champModele.value = voiture.modele;

  const champPrix = document.createElement("input");
  champPrix.className = "form-control mb-2";
    champPrix.placeholder = "Prix (EUR)";
    champPrix.type = "number";
    champPrix.value = voiture.prix;

  const champDescription = document.createElement("textarea");
  champDescription.className = "form-control mb-2";
    champDescription.placeholder = "Description";
    champDescription.rows = 3;
    champDescription.value = voiture.description || "";

  const champPhoto = document.createElement("input");
  champPhoto.className = "form-control mb-2";
    champPhoto.placeholder = "URL photo";
    champPhoto.value = voiture.photo || "";

    // Boutons enregistrer ou annuler
  const actions = document.createElement("div");

  actions.className = "edit-actions mt-2 d-flex flex-column";

  const boutonEnregistrer = document.createElement("button");
  boutonEnregistrer.className = "btn btn-success w-100";
  boutonEnregistrer.textContent = "Enregistrer";

  const boutonAnnuler = document.createElement("button");
  boutonAnnuler.className = "btn btn-outline-secondary w-100 mt-2";
  boutonAnnuler.textContent = "Annuler";

  actions.appendChild(boutonEnregistrer);
  actions.appendChild(boutonAnnuler);

    // Ajout des élements
    carte.appendChild(champMarque);
    carte.appendChild(champModele);
    carte.appendChild(champPrix);
    carte.appendChild(champDescription);
    carte.appendChild(champPhoto);
    carte.appendChild(actions);

    // btn annuler
    boutonAnnuler.addEventListener("click", () => {
      carte.remove();
      boutonModifier.disabled = false;
    });

    boutonEnregistrer.addEventListener("click", async () => {
      // récupere les données pour les champs
      const donnees = {
        marque: champMarque.value.trim(),
        modele: champModele.value.trim(),
        prix: champPrix.value.trim(),
        description: champDescription.value.trim(),
        photo: champPhoto.value.trim() || undefined,
      };

      // trouve l'id de la voiture
      const idVoiture = voiture._id || voiture.id || new URLSearchParams(window.location.search).get("id");

      try {
        // appel de l'api
        const res = await updateVoiture(idVoiture, donnees);

        info.textContent =
          "Marque: " + (donnees.marque) +
          " • Modèle: " + (donnees.modele) +
          " • Prix: " + (donnees.prix);
        desc.textContent = donnees.description;
        // changer l'image
        let img = card.querySelector('.card-img-top');
        if (!img) {
          img = document.createElement('img');
          img.className = 'card-img-top';
          card.appendChild(img);
        }
        img.src = donnees.photo;

        // enlever la carte d'édition
        carte.remove();
        boutonModifier.disabled = false;
      } catch (err) {
        console.error(err);
      }
    });

    return carte;
  }

  // ouvre la cards pour modfier
  boutonModifier.addEventListener('click', () => {
    const carteEdition = creerCarteEdition(v);
    card.appendChild(carteEdition);
  });

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


