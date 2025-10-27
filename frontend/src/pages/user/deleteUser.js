import { chargerDonnees } from "../../local_storage/localStorage.js";

export function deleteUser() {
  document.addEventListener("DOMContentLoaded", () => {
    const user = chargerDonnees();
    const form = document.getElementById("deleteUser");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email")?.value?.trim() ?? "";

      if (!email) {
        alert("Veuillez entrer votre email.");
        return;
      }

      if (email !== user.email) {
        alert("votre email n'est pas correct");
        return;
      }

      alert("etes vous sûr de vouloir supprimer votre compte ?");

      try {
        const res = await fetch("http://localhost:3000/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message || "suppression réussie.");
          window.location.href = "../../../index.html";
        } else {
          alert(data.message || `Erreur: ${res.status}`);
        }
      } catch (err) {
        console.error(err);
        alert("Erreur réseau — impossible de contacter le serveur.");
      }
    });
  });
}

deleteUser();
