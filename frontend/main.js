import { loginUser } from "./src/auth/login/login.js";
import { registerUser } from "./src/auth/register/register.js";
import { displayAllMoto } from "./src/pages/moto/moto.js";
import { displayAllVoiture } from "./src/pages/voiture/voiture.js";

registerUser();
loginUser();
displayAllMoto();
displayAllVoiture();
