import { Exercice } from "./Exercice";

export interface ExerciceComplet extends Exercice{
    repsPerSet : number[]
    rest: number
}