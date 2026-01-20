import { Router } from 'express';
import carRoutes from './car.routes';
import brandRouter from './brand.routes';
import transmissionRouter from './transmission.routes';
import motorizationRouter from './motorization.routes';
import userRoutes from './user.routes';
import reservationRoutes from './reservation.routes';

const router = Router();

router.use('/car', carRoutes);
router.use('/brand', brandRouter);
router.use('/transmission', transmissionRouter);
router.use('/motorization', motorizationRouter);
router.use('/user', userRoutes);
router.use('/reservation', reservationRoutes);

export default router;
