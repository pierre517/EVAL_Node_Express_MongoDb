import {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  getUser,
} from "../models/user.js";
import bcrypt from "bcrypt";

export async function getAllUsersController(req, res) {
  const allUsers = await getAllUsers();

  if (allUsers.length === 0) {
    return res
      .status(400)
      .json({ message: "aucun utilisateur pour le moment" });
  }

  return res.status(200).json(allUsers);
}

// ----------------------------------------//

export async function addUserController(req, res) {
  const allUsers = await getAllUsers();
  const user = allUsers.find((u) => u.email == req.body.email);

  if (user) {
    return res.status(409).json({ message: "cet utilisateur existe deja" });
  }

  if (!req.body.email || !req.body.password || !req.body.name) {
    return res
      .status(400)
      .json({ message: "vous devez remplir tout les champs" });
  }

  if (!req.body.email.match(/^[\p{L}0-9._%+-]+@[\p{L}0-9.-]+\.[\p{L}]{2,}$/u)) {
    return res.status(400).json({ message: "votre email n'est pas valide" });
  }

  if (
    !req.body.password.match(
      /^(?=.*[A-ZÀ-Ý])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_\-])[\p{L}0-9!@#$%^&*(),.?":{}|<>_\-]{9,}$/u
    )
  ) {
    return res.status(400).json({
      message:
        "votre mot de passe doit contenir au moins 8 caracteres, au moins une majuscule, un chiffre et un caractere special",
    });
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const newUser = await addUser(req.body);
  return res
    .status(200)
    .json({ message: "user créé avec succes", user: newUser });
}

//----------------------------//

export async function deleteUserController(req, res) {
  const allUsers = await getAllUsers();
  const user = allUsers.find((u) => u.email == req.body.email);

  if (!user) {
    return res.status(400).json({ message: "cet utilisateur n'existe pas" });
  }

  if (deleteUser(user)) {
    return res.status(200).json({ message: "utilisateur supprimé" });
  }
}

// -----------------------------//

export async function updateUserController(req, res) {
  const id = req.params.id;
  const updatedUser = req.body;

  const user = await updateUser(id, updatedUser);

  if (!user) {
    return res.status(400).json({ message: "cet utilisateur n'existe pas" });
  }

  return res
    .status(200)
    .json({ message: "utilisateur modifié avec succes", user });
}

//------------------------------------//

export async function getUserById(req, res) {
  const id = req.params.id;
  const user = await getUser(id);

  if (!user) {
    return res.status(400).json({ message: "cet utilisateur n'existe pas" });
  }

  return res.status(200).json(user);
}

//-------------------------------------//

export async function loginController(req, res) {
  const allUsers = await getAllUsers();
  const user = allUsers.find((u) => u.email == req.body.email);

  if (!user) {
    return res.status(400).json({ message: "email ou mot de passe incorrect" });
  }

  const passwordOk = await bcrypt.compare(req.body.password, user.password);

  if (!passwordOk) {
    return res.status(400).json({ message: "email ou mot de passe incorrect" });
  }
  res
    .status(200)
    .json({ message: "connexion réussie, bienvenue " + user.name });
}
