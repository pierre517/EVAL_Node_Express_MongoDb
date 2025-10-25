import { connectDb } from "./config/database.js";
import voitureRoute from "./controllers/voitureController.js";
import express from "express";

connectDb();

const app = express();
const port = 3000;
app.use(express.json());

app.use("/voitures", voitureRoute);

app.listen(port, () => console.log(`server started on port ${port}`));
