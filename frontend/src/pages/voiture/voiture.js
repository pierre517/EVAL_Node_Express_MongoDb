import { getDataAllVoitures } from "../../api/api.js";

export async function displayAllVoiture() {
  let main = document.querySelector("main");

  const voitures = await getDataAllVoitures();

  voitures.forEach((v) => {
    const card = document.createElement("div");
    card.className = "vehicule-card";

    const title = document.createElement("h3");
    title.textContent = v.marque || v.modele || "Voiture";
    card.appendChild(title);

    const info = document.createElement("p");
    info.textContent =
      "Marque: " +
      v.marque +
      " • " +
      "Modèle: " +
      v.modele +
      " • " +
      "Prix: " +
      v.prix +
      " €";
    card.appendChild(info);

    if (v.photo) {
      const img = document.createElement("img");
      img.src = v.photo;
      img.alt = "Voiture";
      img.style.maxWidth = "100%";
      card.appendChild(img);
    }

    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const id = v._id || v.id || "";
      window.location.href = `./oneVoiture.html?id=${encodeURIComponent(id)}`;
    });

    main.appendChild(card);
  });
}
displayAllVoiture();
