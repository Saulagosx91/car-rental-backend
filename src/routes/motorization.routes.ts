import { Router } from 'express';
import { MotorizationController } from '@app/controllers/motorization.controller';

const motorizationRouter = Router();
const motorizationController = new MotorizationController();

motorizationRouter
  .route('/')
  .get(motorizationController.getAllMotorizations)
  .post(motorizationController.createMotorization);

motorizationRouter
  .route('/:id')
  .get(motorizationController.getMotorizationById)
  .put(motorizationController.updateMotorization);

export default motorizationRouter;
