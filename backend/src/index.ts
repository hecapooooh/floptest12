import express from "express";
import cors from "cors";
import db from "../src/db/mydatabase.ts"
import helloRouter from "./routes/helloRoutes.ts";

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());
app.use('/hello',helloRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend opérationnel 🚀" });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
});

