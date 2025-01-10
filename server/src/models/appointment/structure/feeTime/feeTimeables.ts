import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize';

export class FeeTimeable extends Model<
InferAttributes<FeeTimeable>,
InferCreationAttributes<FeeTimeable>
>  {
  declare id: CreationOptional<number>;
  declare feeTime_id: number;
  declare feeTimeable_type: string;
  }

export function FeeTimeableFactory(sequelize: Sequelize) {
  FeeTimeable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        unique: 'ft_unique_constraint',
        primaryKey: true,
        autoIncrement: true,
        // references: null,
      },
      feeTime_id: {
        type: DataTypes.INTEGER,
        unique: 'ft_unique_constraint',
      },
      feeTimeable_type: {
        type: DataTypes.STRING,
        unique: 'ft_unique_constraint',
      },
    },
    { 
      sequelize, 
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'feeTimeables',
      tableName: 'feeTimeables',
      freezeTableName: true,
    }
  );

  return FeeTimeable;
}
