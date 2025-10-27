import { chargerDonnees } from "../../local_storage/localStorage.js";

export async function updateUser() {
  const form = document.getElementById("updateUserForm");
  const message = document.getElementById("message");

  const user = chargerDonnees();

  if (user) {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedUser = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      ancienPassword: document.getElementById("ancienPassword").value,
      password: document.getElementById("password").value,
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();

      if (response.ok) {
        message.textContent = "profil mis à jour avec succès !";
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        message.textContent = data.message;
      }
    } catch (error) {
      console.log(error);
      message.textContent = "erreur du coté serveur, veuillez réessayer";
    }
  });
}

updateUser();
