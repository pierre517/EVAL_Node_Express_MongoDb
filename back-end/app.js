import { connectDb } from "./config/database.js";
import voitureRoute from "./routes/voitureRoute.js";
import motoRoute from "./routes/motoRoute.js";
import userRoute from "./routes/userRoute.js";
import express from "express";

connectDb();

const app = express();
const port = 3000;
app.use(express.json());

app.use("/voitures", voitureRoute);
app.use("/motos", motoRoute);
app.use("/users", userRoute);

app.listen(port, () => console.log(`server started on port ${port}`));
