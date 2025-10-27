// Read the selected moto from the API and render its details
import { getDataOneMoto, updateMoto } from "../../api/api.js";

function afficherMoto(m) {
  const main = document.querySelector("main");
  if (!main) return;
  main.innerHTML = "";

  const container = document.createElement("div");
  container.className =
    "container d-flex align-items-start justify-content-center";
  container.style.minHeight = "70vh";
  container.style.paddingTop = "8vh";

  const row = document.createElement("div");
  row.className = "row justify-content-center w-100";

  const col = document.createElement("div");
  col.className = "col-12 col-md-8 col-lg-6";

  const card = document.createElement("div");
  card.className = "card shadow";

  if (m.photo) {
    const img = document.createElement("img");
    img.src = m.photo;
    img.alt = "Moto";
    img.className = "card-img-top";
    card.appendChild(img);
  }

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = `${m.marque || ""} ${m.modele || ""}`.trim() || "Moto";
  cardBody.appendChild(title);

  const info = document.createElement("p");
  info.className = "text-muted";
  info.textContent =
    "Marque: " + m.marque + " • Modèle: " + m.modele + " • Prix: " + m.prix;
  cardBody.appendChild(info);

  const desc = document.createElement("p");
  desc.className = "card-text";
  desc.textContent = m.description || "";
  cardBody.appendChild(desc);

  const back = document.createElement("a");
  back.href = "./moto.html";
  back.textContent = "← Retour aux motos";
  back.className = "btn btn-secondary mt-3";
  cardBody.appendChild(back);

  // Bouton Modifier
  const boutonModifier = document.createElement("button");
  boutonModifier.type = "button";
  boutonModifier.className = "btn btn-primary ms-2 mt-3";
  boutonModifier.textContent = "Modifier";
  cardBody.appendChild(boutonModifier);

  // Crée la carte modif pour la moto
  function creerCarteEdition(moto) {
    const carte = document.createElement("div");
    carte.className = "card shadow edit-card p-3 mt-3";

    const champMarque = document.createElement("input");
    champMarque.className = "form-control mb-2";
    champMarque.placeholder = "Marque";
    champMarque.value = moto.marque;

    const champModele = document.createElement("input");
    champModele.className = "form-control mb-2";
    champModele.placeholder = "Modèle";
    champModele.value = moto.modele;

    const champPrix = document.createElement("input");
    champPrix.className = "form-control mb-2";
    champPrix.placeholder = "Prix (EUR)";
    champPrix.type = "number";
    champPrix.value = moto.prix;

    const champDescription = document.createElement("textarea");
    champDescription.className = "form-control mb-2";
    champDescription.placeholder = "Description";
    champDescription.rows = 3;
    champDescription.value = moto.description;

    const champPhoto = document.createElement("input");
    champPhoto.className = "form-control mb-2";
    champPhoto.placeholder = "URL photo";
    champPhoto.value = moto.photo;

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

    carte.appendChild(champMarque);
    carte.appendChild(champModele);
    carte.appendChild(champPrix);
    carte.appendChild(champDescription);
    carte.appendChild(champPhoto);
    carte.appendChild(actions);

    boutonAnnuler.addEventListener("click", () => {
      carte.remove();
      boutonModifier.disabled = false;
    });

    boutonEnregistrer.addEventListener("click", async () => {
      const donnees = {
        marque: champMarque.value.trim(),
        modele: champModele.value.trim(),
        prix: champPrix.value.trim(),
        description: champDescription.value.trim(),
        photo: champPhoto.value.trim(),
      };

      const idMoto =
        moto._id ||
        moto.id ||
        new URLSearchParams(window.location.search).get("id");

      try {
        await updateMoto(idMoto, donnees);

        info.textContent =
          "Marque: " +
          (donnees.marque || "-") +
          " • Modèle: " +
          (donnees.modele || "-") +
          " • Prix: " +
          (donnees.prix != null ? donnees.prix + " €" : "-");
        desc.textContent = donnees.description || "";

        let img = card.querySelector(".card-img-top");
        if (!img) {
          img = document.createElement("img");
          img.alt = "Moto";
          img.className = "card-img-top";
          card.appendChild(img);
        }
        img.src = donnees.photo;

        carte.remove();
        boutonModifier.disabled = false;
      } catch (err) {
        console.error(err);
      }
    });

    return carte;
  }

  // ouvre la carte pour modifier
  boutonModifier.addEventListener("click", () => {
    const carteEdition = creerCarteEdition(m);
    card.appendChild(carteEdition);
  });

  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);
  container.appendChild(row);
  main.appendChild(container);
}

function initMoto() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const main = document.querySelector("main");

  if (!main) return;

  if (!id) {
    main.innerHTML = "<p class='text-danger'>Aucune moto sélectionnée.</p>";
    return;
  }

  getDataOneMoto(id)
    .then((moto) => {
      if (!moto) {
        main.innerHTML = "<p class='text-danger'>Moto introuvable.</p>";
        return;
      }
      afficherMoto(moto);
    })
    .catch((err) => {
      console.error(err);
      main.innerHTML =
        "<p class='text-danger'>Erreur lors de la récupération de la moto.</p>";
    });
}

initMoto();
