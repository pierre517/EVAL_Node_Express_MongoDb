import { chargerDonnees } from "../../local_storage/localStorage.js";

function afficherUser() {
  const user = chargerDonnees();

  const titre = document.getElementById("titreUser");

  titre.textContent = `bonjour ${user.name}`;
}

afficherUser();
