import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "@app/config/database";

class Brand extends Model <InferAttributes<Brand>, InferCreationAttributes<Brand>> { }

Brand.init(
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
    modelName: 'Brand',
    tableName: 'brand'
  }
);

export default Brand;