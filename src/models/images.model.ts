import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "@app/config/database";
import Car from "./car.model";

class Images extends Model <InferAttributes<Images>, InferCreationAttributes<Images>> { }

Images.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Images',
    tableName: 'images'
  }
);

Car.hasMany(Images, { foreignKey: 'carId' });
Images.belongsTo(Car, { foreignKey: 'carId' });

export default Images;