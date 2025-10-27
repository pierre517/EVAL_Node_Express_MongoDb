// Read the selected voiture from the API and render its details
import { getDataOneVoiture, updateVoiture, deleteVoitureByImmat } from "../../api/api.js";

function afficherVoiture(voiture) {
  const principal = document.querySelector("main");
  if (!principal) return;
  principal.innerHTML = "";

  const conteneur = document.createElement("div");
  conteneur.className = "container d-flex align-items-start justify-content-center";
  conteneur.style.minHeight = "70vh";
  conteneur.style.paddingTop = "8vh";

  const rangee = document.createElement("div");
  rangee.className = "row justify-content-center w-100";

  const colonne = document.createElement("div");
  colonne.className = "col-12 col-md-8 col-lg-6";

  const carte = document.createElement("div");

  carte.className = "card shadow has-edit-overlay";

  if (voiture.photo) {
    const image = document.createElement("img");
    image.src = voiture.photo;
    image.alt = "Voiture";
    image.className = "card-img-top";
    carte.appendChild(image);
  }

  const carteCorps = document.createElement("div");
  carteCorps.className = "card-body";

  const titre = document.createElement("h2");
  titre.className = "card-title";
  titre.textContent = `${voiture.marque || ""} ${voiture.modele || ""}`.trim() || "Voiture";
  carteCorps.appendChild(titre);

  const infos = document.createElement("p");
  infos.className = "text-muted";
  infos.textContent =
    "Marque: " + (voiture.marque || "-") +
    " • Modèle: " + (voiture.modele || "-") +
    " • Prix: " + (voiture.prix != null ? voiture.prix + " €" : "-");
  carteCorps.appendChild(infos);

  const descriptionEl = document.createElement("p");
  descriptionEl.className = "card-text";
  descriptionEl.textContent = voiture.description || "";
  carteCorps.appendChild(descriptionEl);

  const retour = document.createElement("a");
  retour.href = "./voiture.html";
  retour.textContent = "← Retour aux voitures";
  retour.className = "btn btn-secondary mt-3";
  carteCorps.appendChild(retour);

  // Bouton Modifier
  const boutonModifier = document.createElement("button");
  boutonModifier.type = "button";
  boutonModifier.className = "btn btn-primary ms-2 mt-3";
  boutonModifier.textContent = "Modifier";
  carteCorps.appendChild(boutonModifier);

  // Bouton Supprimer (à droite de Modifier)
  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.type = "button";
  boutonSupprimer.className = "btn btn-danger ms-2 mt-3";
  boutonSupprimer.textContent = "Supprimer";
  carteCorps.appendChild(boutonSupprimer);

  // Crée la carte de modification 
  function creerCarteEdition(voiture) {
  const carteEdition = document.createElement("div");
  carteEdition.className = "card shadow edit-card p-3";

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
  carteEdition.appendChild(champMarque);
  carteEdition.appendChild(champModele);
  carteEdition.appendChild(champPrix);
  carteEdition.appendChild(champDescription);
  carteEdition.appendChild(champPhoto);
  carteEdition.appendChild(actions);

    // btn annuler
    boutonAnnuler.addEventListener("click", () => {
      carteEdition.remove();
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

        infos.textContent =
          "Marque: " + (donnees.marque) +
          " • Modèle: " + (donnees.modele) +
          " • Prix: " + (donnees.prix);
        descriptionEl.textContent = donnees.description;
        // changer l'image
        let img = carte.querySelector('.card-img-top');
        if (!img) {
          img = document.createElement('img');
          img.className = 'card-img-top';
          carte.appendChild(img);
        }
        img.src = donnees.photo;

        // enlever la carte d'édition
        carteEdition.remove();
        boutonModifier.disabled = false;
      } catch (err) {
        console.error(err);
      }
    });

    return carteEdition;
  }

  // ouvre la cards pour modfier
  boutonModifier.addEventListener('click', () => {
    const carteEdition = creerCarteEdition(voiture);
    carte.appendChild(carteEdition);
  });

  // crée la carte de confirmation suppression
  function creerCarteSuppression(voiture) {
    const carteSuppression = document.createElement('div');
    carteSuppression.className = 'card shadow delete-card p-3';

    const titre = document.createElement('h5');
    titre.className = 'card-title text-danger';
    titre.textContent = 'Confirmer la suppression';
  carteSuppression.appendChild(titre);

    const infoDel = document.createElement('p');
    infoDel.className = 'card-text';
    infoDel.textContent = `Pour supprimer ce véhicule, tapez son immatriculation puis cliquez sur Supprimer.`;
  carteSuppression.appendChild(infoDel);

    const label = document.createElement('label');
    label.textContent = 'Immatriculation';
    label.className = 'form-label';
  carteSuppression.appendChild(label);

    const input = document.createElement('input');
    input.className = 'form-control confirm-input mb-2';
    input.placeholder = voiture.immatriculation || '';
  carteSuppression.appendChild(input);

    const actions = document.createElement('div');
    actions.className = 'd-flex gap-2';

    const btnCancel = document.createElement('button');
    btnCancel.className = 'btn btn-outline-secondary w-100';
    btnCancel.textContent = 'Annuler';

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn btn-danger w-100';
    btnDelete.textContent = 'Supprimer';

  actions.appendChild(btnCancel);
  actions.appendChild(btnDelete);
  carteSuppression.appendChild(actions);

    btnCancel.addEventListener('click', () => {
      carteSuppression.remove();
      boutonSupprimer.disabled = false;
    });

    btnDelete.addEventListener('click', async () => {
      const saisie = (input.value).trim();
      const actuel = (voiture.immatriculation).trim();

      if (!saisie) {
        alert('Veuillez saisir l\'immatriculation pour confirmer.');
        return;
      }

      try {
        await deleteVoitureByImmat({ immatriculation: actuel });
        window.location.href = './voiture.html';
      } catch (err) {
        console.error(err);
      }
    });

    return carteSuppression;
  }

  // ouvre la carte de suppression
  boutonSupprimer.addEventListener('click', () => {
    const carteSupp = creerCarteSuppression(voiture);
    carte.appendChild(carteSupp);
  });

  carte.appendChild(carteCorps);
  colonne.appendChild(carte);
  rangee.appendChild(colonne);
  conteneur.appendChild(rangee);

  principal.appendChild(conteneur);
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
      //On supprime l'id de l'url
      window.history.replaceState(null, '', window.location.pathname);
    })
    .catch((err) => {
      console.error(err);
      main.innerHTML = "<p class='text-danger'>Erreur lors de la récupération de la voiture.</p>";
    });
}

initVoiture();


