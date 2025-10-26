import { getDataAllVoitures } from "../../api/api.js";

export async function displayAllVoiture() {
  const main = document.querySelector("main");
  main.classList.add("container", "my-4");

  const voitures = await getDataAllVoitures();

  const row = document.createElement("div");
  row.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3";

  voitures.forEach((v) => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm vehicle-card";
    card.style.cursor = "pointer";

    if (v.photo) {
      const img = document.createElement("img");
      img.src = v.photo;
      img.alt = "Voiture";
      img.className = "card-img-top";
      card.appendChild(img);
    }

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = v.marque || v.modele || "Voiture";
    cardBody.appendChild(title);

    const info = document.createElement("p");
    info.className = "card-text text-muted";
    info.textContent = `Marque: ${v.marque || '-'} • Modèle: ${v.modele || '-'} • Prix: ${v.prix || '-'} €`;
    cardBody.appendChild(info);

    card.appendChild(cardBody);

    card.addEventListener("click", () => {
      const id = v._id || v.id || "";
      window.location.href = `./oneVoiture.html?id=${encodeURIComponent(id)}`;
    });

    col.appendChild(card);
    row.appendChild(col);
  });

  main.appendChild(row);
}
displayAllVoiture();
