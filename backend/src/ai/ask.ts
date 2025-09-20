import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";
import type { CompleteTraining } from "../models/completeTraining";

dotenv.config();

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

async function askTraining(userInput: string): Promise<CompleteTraining> {
  const prompt = `
Crée un programme d'entraînement complet basé sur cette demande: "${userInput}"

IMPORTANT: Tu dois répondre UNIQUEMENT avec un JSON valide qui respecte exactement cette structure:

{
  "name": "Nom du programme",
  "intensity": "low|medium|high",
  "duration_minutes": 45,
  "is_public": true,
  "exercises": [
    {
      "exercise": {
        "name": "Nom de l'exercice",
        "muscle_group": "Groupe musculaire",
      },
      "position": 1,
      "rest_seconds": 60,
      "sets": [
        { "set_number": 1, "reps": 12, "weight": 20 },
        { "set_number": 2, "reps": 10, "weight": 22 }
      ]
    }
  ]
}

Règles importantes:
- Choisis des exercices adaptés au niveau demandé
- Varie les groupes musculaires 
- Adapte les poids, répétitions et temps de repos
- Donne des noms d'exercices en français
- Les muscle_group en anglais: Chest, Back, Legs, Shoulders, Arms, Core
- Ne réponds QUE avec le JSON, aucun autre texte
`;

  try {
    const response = await cohere.chat({
      model: "command-r-plus",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      responseFormat: {
        type: "json_object"
      },
      temperature: 0.4, // Un peu de créativité
      maxTokens: 2000,
    });

    // Vérification robuste de la réponse
    const content = response.message?.content;
    if (!content || !Array.isArray(content) || content.length === 0) {
      throw new Error("Réponse vide ou malformée de Cohere");
    }

    const textContent = content[0]?.text;
    if (!textContent) {
      throw new Error("Pas de contenu texte dans la réponse Cohere");
    }

    // Parse la réponse JSON
    let trainingData;
    trainingData = JSON.parse(textContent);
    
    
    // Ajoute created_at comme requis par le type
    const completeTraining: CompleteTraining = {
      ...trainingData,
      created_at: Date.now().toString()
    };

    return completeTraining;

  } catch (error) {
    console.error("Erreur lors de la génération du training:", error);
    throw new Error("Impossible de générer le training avec Cohere");
  }
}

// Exemple d'utilisation
async function generateTraining() {
  try {
    const userRequest = "Je veux un programme jambes avec une intensité moyenne de 45 minutes";
    const training = await askTraining(userRequest);
    console.log("✅ Training généré:", JSON.stringify(training, null, 2));
    return training;
  } catch (error) {
    console.error("❌ Erreur:", error);
  }
}

// Export pour utilisation dans tes controllers
export { generateTraining };