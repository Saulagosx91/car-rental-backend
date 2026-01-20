import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '@app/config/database';
import Car from './car.model';

class LegalDetails extends Model<
  InferAttributes<LegalDetails>,
  InferCreationAttributes<LegalDetails>
> {}

LegalDetails.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    insurance_image: {
      type: DataTypes.STRING,
    },
    registrationImage: {
      type: DataTypes.STRING,
    },
    insuraceExpiration: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'LegalDetails',
    tableName: 'legalDetails',
  }
);

Car.hasOne(LegalDetails, { foreignKey: 'carId' });
LegalDetails.belongsTo(Car, { foreignKey: 'carId' });

export default LegalDetails;
