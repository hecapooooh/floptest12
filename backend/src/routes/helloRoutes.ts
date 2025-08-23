import express from 'express';
import { sayHello, sayGoodbye } from '../controller/helloControler.ts';

const helloRouter = express.Router();

helloRouter.get('/', sayHello);
helloRouter.get('/goodbye', sayGoodbye);

export default helloRouter;