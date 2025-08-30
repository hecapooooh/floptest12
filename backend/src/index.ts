import express from "express";
import cors from "cors";
import db from "./db/index.ts";
import type { CompleteTraining } from "./models/completeTraining.ts";
import { insertCompleteTraining } from "./services/completeTrainingService.ts";
const app = express();
const PORT = 5000;

// Liste des origines autorisées
const allowedOrigins = [
  "http://localhost:5173",
  "https://monapp.mondns.com"
];

// Middleware CORS avec whitelist
app.use(
  cors({
    origin: (origin, callback) => {
      // autoriser requêtes sans origin (ex: Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // si tu veux gérer cookies / auth
  })
);

app.use(express.json());



app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
});

let train : CompleteTraining = {
  exercises: [],
  name: "",
  is_public: false,
  created_at: ""
}

insertCompleteTraining(train);