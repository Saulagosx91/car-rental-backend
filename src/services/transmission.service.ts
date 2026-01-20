import Transmission from '@app/models/transmission.model';
import { IService } from './IService';
import { NotFoundException } from '@app/common/exceptions/httpException';

export class TransmissionService implements IService<Transmission> {
  async find() {
    const transmission = await Transmission.findAll();
    if (transmission.length === 0) {
      throw new NotFoundException('No transmissions found');
    }
    return transmission;
  }

  async findOne(id: number) {
    const transmission = await Transmission.findByPk(id);
    if (!transmission) {
      throw new NotFoundException(`Transmission with id ${id} not found`);
    }
    return transmission;
  }

  async create(data: Partial<Transmission>) {
    // console.log(data);
    const transmission = await Transmission.create(data);
    return transmission;
  }

  async update(id: number, data: Partial<Transmission>) {
    const transmission = await this.findOne(id);
    if (!transmission) {
      throw new NotFoundException(`Transmission with id ${id} not found`);
    }
    await transmission.update(data);
    return transmission;
  }

  async remove(id: number) {
    const transmission = await this.findOne(id);
    if (!transmission) {
      throw new NotFoundException(`Transmission with id ${id} not found`);
    }
    await transmission.destroy();
    return true;
  }
}
