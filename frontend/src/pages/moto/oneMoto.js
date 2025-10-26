// Read the selected moto from the API and render its details
import { getDataOneMoto } from "../../api/api.js";

function afficherMoto(m) {
	const main = document.querySelector("main");
	if (!main) return;
	main.innerHTML = "";

	const card = document.createElement("div");
	card.className = "vehicule-card";

	const title = document.createElement("h2");
	title.textContent = `${m.marque || ""} ${m.modele || ""}`.trim() || "Moto";
	card.appendChild(title);

	const info = document.createElement("p");
	info.textContent =
		"Marque: " + (m.marque || "-") +
		" • Modèle: " + (m.modele || "-") +
		" • Prix: " + (m.prix != null ? m.prix + " €" : "-");
	card.appendChild(info);

	if (m.photo) {
		const img = document.createElement("img");
		img.src = m.photo;
		img.alt = "Moto";
		img.style.maxWidth = "100%";
		card.appendChild(img);
	}

	const desc = document.createElement("p");
	desc.textContent = m.description;
	card.appendChild(desc);

	const back = document.createElement("a");
	back.href = "./moto.html";
	back.textContent = "← Retour aux motos";
	back.className = "btn btn-secondary mt-3";
	card.appendChild(back);

	main.appendChild(card);
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
