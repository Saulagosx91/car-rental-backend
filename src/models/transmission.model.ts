import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '@app/config/database';

class Transmission extends Model <InferAttributes<Transmission>, InferCreationAttributes<Transmission>> {}

Transmission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Transmission',
    tableName: 'transmission'
  }
);

export default Transmission;