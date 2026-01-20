import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "@app/config/database";

class Motorization extends Model <InferAttributes<Motorization>, InferCreationAttributes<Motorization>> { }

Motorization.init(
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
    modelName: 'Motorization',
    tableName: 'motorization'
  }
);

export default Motorization;