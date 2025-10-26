import { getDataAllMotos } from "../../api/api.js";

export async function displayAllMoto() {
  let main = document.querySelector("main");

  const motos = await getDataAllMotos();

  motos.forEach((m) => {
    const card = document.createElement("div");
    card.className = "vehicule-card";

    const title = document.createElement("h3");
    title.textContent = m.marque || m.modele || "Moto";
    card.appendChild(title);

    const info = document.createElement("p");
    info.textContent =
      "Marque: " +
      m.marque +
      " • " +
      "Modèle: " +
      m.modele +
      " • " +
      "Prix: " +
      m.prix +
      " €";
    card.appendChild(info);

    if (m.photo) {
      const img = document.createElement("img");
      img.src = m.photo;
      img.alt = "Moto";
      img.style.maxWidth = "100%";
      card.appendChild(img);
    }

    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const id = m._id || m.id || "";
      window.location.href = `./oneMoto.html?id=${encodeURIComponent(id)}`;
    });

    main.appendChild(card);
  });
}

displayAllMoto();
