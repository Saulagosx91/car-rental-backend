import { Router } from 'express';
import { BrandController } from '@app/controllers/brand.controller';

const brandRouter = Router();
const brandController = new BrandController();

brandRouter
  .route('/')
  .get(brandController.getAllBrands)
  .post(brandController.createBrand);

brandRouter
  .route('/:id')
  .get(brandController.getBrandById)
  .put(brandController.updateBrand)
  .delete(brandController.deleteBrand);

export default brandRouter;