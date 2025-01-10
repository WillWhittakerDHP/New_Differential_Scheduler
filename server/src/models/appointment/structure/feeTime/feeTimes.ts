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

import { FeeTimeable } from './feeTimeables.js';

export class FeeTime extends Model<
InferAttributes<FeeTime>,
InferCreationAttributes<FeeTime>
> {
  declare id: CreationOptional<number>;
  declare base_sq_ft: number;
  declare DataCollection?: FeeTime[]; // Foreign key
  declare ReportWriting?: FeeTime[]; // Foreign key
  declare ClientPresentation?: FeeTime[]; // Foreign key


  declare getFeeTimeable: BelongsToManyGetAssociationsMixin<FeeTimeable>;
  declare getFeeTimeables: BelongsToManyGetAssociationsMixin<FeeTimeable[]>;
  
  declare addFeeTimeable: BelongsToManyAddAssociationMixin<FeeTimeable, FeeTimeable['feeTime_id']>;
  declare addFeeTimeables: BelongsToManyAddAssociationMixin<
  FeeTimeable[],
  FeeTimeable['feeTime_id'][]
  >;

}

export function FeeTimeFactory(sequelize: Sequelize) {
  FeeTime.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      base_sq_ft: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'feeTimes',
      tableName: 'feeTimes',
      freezeTableName: true,
    }
  );
  
  return FeeTime;
}