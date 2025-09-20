import express from 'express';
import {sayHello} from '../controller/trainingController';
const helloRouter = express.Router();


helloRouter.post('/', sayHello);

export default helloRouter;