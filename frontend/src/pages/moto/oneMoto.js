// Read the selected moto from the API and render its details
import { getDataOneMoto } from "../../api/api.js";

function afficherMoto(m) {
	const main = document.querySelector("main");
	if (!main) return;
	main.innerHTML = "";

	const container = document.createElement("div");
	container.className = "container d-flex align-items-start justify-content-center";
	container.style.minHeight = "70vh";
	container.style.paddingTop = "4vh";

	const row = document.createElement("div");
	row.className = "row justify-content-center w-100";

	const col = document.createElement("div");
	col.className = "col-12 col-md-8 col-lg-6";

	const card = document.createElement("div");
	card.className = "card shadow";

	// Photo (if present)
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
		"Marque: " + (m.marque || "-") +
		" • Modèle: " + (m.modele || "-") +
		" • Prix: " + (m.prix != null ? m.prix + " €" : "-");
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
			main.innerHTML = "<p class='text-danger'>Erreur lors de la récupération de la moto.</p>";
		});
}

initMoto();
