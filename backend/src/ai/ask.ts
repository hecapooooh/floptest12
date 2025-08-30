import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY, // clé API dans ton .env
});

async function main() {
  const response = await cohere.chat({
    model: "command-r-plus", // ou "command-a-03-2025" si tu veux la preview
    messages: [
      {
        role: "user",
        content: "hello world!",
      },
    ],
  });

  console.log(response.message);
}

