import express from 'express';
import db from "../db/mydatabase.ts"

type Request = express.Request;
type Response = express.Response;

export function sayHello(req: Request, res: Response): void {
  const hello = db.prepare(`SELECT * from exercises where exercises.muscle_group = 'dos'`).all();
  res.json(hello);
}

export function sayGoodbye(req: Request, res: Response): void {
    const exercises = db.prepare(`SELECT * from exercises;`).all();
    res.json(exercises);
}