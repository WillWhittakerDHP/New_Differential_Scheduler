import { 
  Model, 
  DataTypes, 
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  Sequelize, 
} from 'sequelize';

import { FeeTime } from './feeTimes.js';

export class DataCollection extends Model<
  InferAttributes<DataCollection>,
  InferCreationAttributes<DataCollection>
> {
  declare id: CreationOptional<number>;
  declare on_site: boolean;
  declare client_present: boolean;
  declare base_time: number;
  declare rate_over_base_time: number;
  declare base_fee: number;
  declare rate_over_base_fee: number;
  
  declare getFeeTime: BelongsToManyGetAssociationsMixin<FeeTime>;
  declare getFeeTimes: BelongsToManyGetAssociationsMixin<FeeTime[]>;
  
  declare addFeeTime: BelongsToManyAddAssociationMixin<FeeTime, FeeTime['id']>;
  declare addFeeTimes: BelongsToManyAddAssociationMixin<
    FeeTime[],
    FeeTime['id'][]
  >;
}

export function DataCollectionFactory(sequelize: Sequelize): typeof DataCollection {
  DataCollection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      on_site: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      client_present: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      base_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rate_over_base_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: 'data_collection',
      tableName: 'data_collection',
      freezeTableName: true,
    }
  );

  return DataCollection;
}