import { connectDb } from "./config/database.js";

connectDb();

import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => console.log(`server started on port ${port}`));
