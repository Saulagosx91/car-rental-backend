import Motorization from '@app/models/motorization.model';
import { IService } from './IService';
import { NotFoundException } from '@app/common/exceptions/httpException';

export class MotorizationService implements IService<Motorization> {
  async find() {
    const motorizations = await Motorization.findAll();
    if (motorizations.length === 0) {
      throw new NotFoundException('No motorizations found');
    }
    return motorizations;
  }

  async findOne(id: number) {
    const motorization = await Motorization.findByPk(id);
    if (!motorization) {
      throw new NotFoundException(`Motorization with id ${id} not found`);
    }
    return motorization;
  }

  async create(data: Partial<Motorization>) {
    const motorization = await Motorization.create(data);
    return motorization;
  }

  async update(id: number, data: Partial<Motorization>) {
    const motorization = await this.findOne(id);
    if (!motorization) {
      throw new NotFoundException(`Motorization with id ${id} not found`);
    }
    await motorization.update(data);
    return motorization;
  }

  async remove(id: number) {
    const motorization = await this.findOne(id);
    if (!motorization) {
      throw new NotFoundException(`Motorization with id ${id} not found`);
    }
    await motorization.destroy();
    return true;
  }
}
