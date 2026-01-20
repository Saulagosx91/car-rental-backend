import Car from '@app/models/car.model';
import Brand from '@app/models/brand.model';
import Motorization from '@app/models/motorization.model';
import Transmission from '@app/models/transmission.model';
import { IService } from './IService';
import {
  NotFoundException,
  BadRequestException,
} from '@app/common/exceptions/httpException';

export class CarService implements IService<Car> {
  async find() {
    const cars = await Car.findAll({
      include: [Brand, Motorization, Transmission]
    });
    if (cars.length === 0) {
      throw new NotFoundException('No cars found');
    }

    return cars;
  }

  async findOne(id: number) {
    const car = await Car.findByPk(id, {
      include: [Brand, Motorization, Transmission]
    });
    car?.name;
    if (car) return car;

    throw new NotFoundException(`Car with id ${id} not found`);
  }

  async create(carData: Car) {
    const brandExists = await Brand.findByPk(carData.brandId);
    if (!brandExists) {
      throw new BadRequestException(
        `Brand with id ${carData.brandId} not found`
      );
    }

    const motorizationExists = await Motorization.findByPk(
      carData.motorizationId
    );
    if (!motorizationExists) {
      throw new BadRequestException(
        `Motorization with id ${carData.motorizationId} not found`
      );
    }

    const transmissionExists = await Transmission.findByPk(
      carData.transmissionId
    );
    if (!transmissionExists) {
      throw new BadRequestException(
        `Transmission with id ${carData.transmissionId} not found`
      );
    }

    const newCar = await Car.create(carData);
    return newCar;
  }

  async update(id: number, carData: Partial<Car>) {
    const carToUpdate = await Car.findByPk(id);
    if (!carToUpdate) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    const updatedCar = await carToUpdate.update(carData);
    return updatedCar;
  }

  async remove(id: number) {
    const carToDelete = await Car.findByPk(id);
    if (!carToDelete) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    carToDelete.update({ isActive: false });

    return true;
  }
}
