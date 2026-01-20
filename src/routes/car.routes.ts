import { Router } from 'express';
import { CarController } from '@app/controllers/car.controller';
import { CreateCarDto } from '@app/dtos/car.dto';
import validateDto from '@app/middlewares/validateDto';
import { upload } from '@app/config/multer';

const carRoutes = Router();
const carController = new CarController();

carRoutes
  .route('/')
  .get(carController.getAllCars)
  .post(upload.single('car_image'), carController.createCar);

carRoutes
  .route('/:id')
  .get(carController.getCarById)
  .put(carController.updateCar)
  .delete(carController.removeCar);

export default carRoutes;