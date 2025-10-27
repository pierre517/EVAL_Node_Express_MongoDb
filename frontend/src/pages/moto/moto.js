import { getDataAllMotos } from "../../api/api.js";

export async function displayAllMoto() {
  const main = document.querySelector("main");
  
  main.classList.add("container", "my-4", "moto-page");

  const motos = await getDataAllMotos();

  const row = document.createElement("div");
  row.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3";

  motos.forEach((m) => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm vehicle-card";
    card.style.cursor = "pointer";

    if (m.photo) {
      const img = document.createElement("img");
      img.src = m.photo;
      img.alt = "Moto";
      img.className = "card-img-top";
      card.appendChild(img);
    }

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = m.marque || m.modele || "Moto";
    cardBody.appendChild(title);

    const info = document.createElement("p");
    info.className = "card-text text-muted";
    info.textContent = `Marque: ${m.marque || '-'} • Modèle: ${m.modele || '-'} • Prix: ${m.prix || '-'} €`;
    cardBody.appendChild(info);

    card.appendChild(cardBody);

    card.addEventListener("click", () => {
      const id = m._id || m.id || "";
      window.location.href = `./oneMoto.html?id=${encodeURIComponent(id)}`;
    });

    col.appendChild(card);
    row.appendChild(col);
  });

  main.appendChild(row);
}

displayAllMoto();
