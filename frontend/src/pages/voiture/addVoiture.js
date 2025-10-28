function addVoiture() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addVoiture");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const marque = document.getElementById("marque")?.value?.trim() ?? "";
      const modele = document.getElementById("modele")?.value?.trim() ?? "";
      const prix = document.getElementById("prix")?.value ?? "";
      const description =
        document.getElementById("description")?.value?.trim() ?? "";
      const photo = document.getElementById("photo")?.value?.trim() ?? "";
      const immatriculation =
        document.getElementById("immatriculation")?.value?.trim() ?? "";

      if (
        !marque ||
        !modele ||
        !prix ||
        !description ||
        !photo ||
        !immatriculation
      ) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/voitures", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            marque,
            modele,
            prix,
            description,
            photo,
            immatriculation,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          // Le backend renvoie { message: 'user créé avec succes', user: newUser }
          alert(data.message || "voiture ajoutée avec succès.");
          window.location.href = "./voiture.html";
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
addVoiture();
