import express from 'express';

type Request = express.Request;
type Response = express.Response;

export function sayHello(req: Request, res: Response): void {
  const now = new Date();
  const heure = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  res.json({ message: `Bonjour, comment ça va ? Il est ${heure}` });
}

export function sayGoodbye(req: Request, res: Response): void {
  res.json({ message: "Au revoir et à bientôt ! 👋" });
}