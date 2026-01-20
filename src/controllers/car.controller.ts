import { Request, Response, NextFunction } from 'express';
import { CarService } from '@app/services/car.service';
import { NotFoundException, BadRequestException } from '@app/common/exceptions/httpException';
import { HttpStatusCode } from '@app/common/http/httpStatusCode';

const carService = new CarService();

export class CarController {
  async getAllCars(req: Request, res: Response) {
    try {
      const cars = await carService.find();
      res.status(HttpStatusCode.OK).json(cars);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async getCarById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const car = await carService.findOne(id);

      res.status(HttpStatusCode.OK).json(car);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async createCar(req: Request, res: Response, next: NextFunction) {
    try {
      const carData = req.body;
      if (req.file) {
        carData.car_image = `/uploads/${req.file.filename}`;
      }

      const newCar = await carService.create(carData);
      res.status(HttpStatusCode.CREATED).json(newCar);
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async updateCar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const carData = req.body;
      console.log(carData);
      const updatedCar = await carService.update(id, carData);
      res.status(HttpStatusCode.OK).json(updatedCar);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async removeCar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await carService.remove(id);
      res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }
}
