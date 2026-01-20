import Brand from '@app/models/brand.model';
import { IService } from './IService';
import { NotFoundException } from '@app/common/exceptions/httpException';

export class BrandService implements IService<Brand> {
  async find() {
    const brands = await Brand.findAll();
    if (brands.length === 0) {
      throw new NotFoundException('No brands found');
    }
    return brands;
  }

  async findOne(id: number) {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return brand;
  }

  async create(data: Partial<Brand>) {
    // console.log(data);
    const brand = await Brand.create(data);
    return brand;
  }

  async update(id: number, data: Partial<Brand>) {
    const brand = await this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    await brand.update(data);
    return brand;
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    await brand.destroy();
    return true;
  }
}
