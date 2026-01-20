import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "@app/config/database";
import Brand from "./brand.model";
import Transmission from "./transmission.model";
import Motorization from "./motorization.model";
import { AllowNull } from "sequelize-typescript";

class Car extends Model<InferAttributes<Car>, InferCreationAttributes<Car>> {
  declare id: number;
  declare name: string;
  declare price: number;
  declare color: string | null;
  declare passengers: number;
  declare plate: string;
  declare car_image: string | null;
  declare is_active: boolean;
  declare brandId?: number;
  declare transmissionId?: number;
  declare motorizationId?: number;
}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
    },
    passengers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    plate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    car_image: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Car',
    tableName: 'car'
  }
);

Brand.hasMany(Car, { foreignKey: 'brandId' });
Car.belongsTo(Brand, { foreignKey: 'brandId' });

Transmission.hasMany(Car, { foreignKey: 'transmissionId' });
Car.belongsTo(Transmission, { foreignKey: 'transmissionId' });

Motorization.hasMany(Car, { foreignKey: 'motorizationId' });
Car.belongsTo(Motorization, { foreignKey: 'motorizationId' });

export default Car;