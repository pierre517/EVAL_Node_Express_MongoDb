
export function registerUser(){
document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("register");
	if (!form) return;

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		// lecture sûre des champs: protège contre element manquant et contre trim sur undefined
		const name = document.getElementById("name")?.value?.trim() ?? "";
		const email = document.getElementById("email")?.value?.trim() ?? "";
		const password = document.getElementById("password")?.value ?? "";

		if (!name || !email || !password) {
			alert("Veuillez remplir tous les champs.");
			return;
		}

		try {
			const res = await fetch("http://localhost:3000/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});

			const data = await res.json();

			if (res.ok) {
				// Le backend renvoie { message: 'user créé avec succes', user: newUser }
				alert(data.message || "Inscription réussie.");
				window.location.href = '../../../index.html';
			} else {
				// Affiche le message d'erreur renvoyé par le serveur
				alert(data.message || `Erreur: ${res.status}`);
			}
		} catch (err) {
			console.error(err);
			alert("Erreur réseau — impossible de contacter le serveur.");
		}
	});
});
}


