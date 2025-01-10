import { 
  Model, 
  DataTypes, 
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize, 
} from 'sequelize';

export class DataCollectionFee extends Model<
  InferAttributes<DataCollectionFee>,
  InferCreationAttributes<DataCollectionFee>
> {
  declare id: CreationOptional<number>;
  declare base_fee: number;
  declare rate_over_base_fee: number;
  
}

export function DataCollectionFeeFactory(sequelize: Sequelize): typeof DataCollectionFee {
  DataCollectionFee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      base_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rate_over_base_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'data_collection_fee',
      tableName: 'data_collection_fee',
      freezeTableName: true,
    }
  );

  return DataCollectionFee;
}