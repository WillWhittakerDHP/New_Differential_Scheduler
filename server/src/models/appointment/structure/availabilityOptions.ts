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

import { Service } from './serviceTypes.js';
// import { FeeTime } from './feeTime/feeTimes.js';


export class AvailabilityOption extends Model<
  InferAttributes<AvailabilityOption>,
  InferCreationAttributes<AvailabilityOption>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare differential_scheduling: boolean;
  declare visibility: boolean;
  declare description: string;
  declare data_collection_id?: number; // Foreign key
  declare report_writing_id?: number; // Foreign key
  declare client_presentation_id?: number; // Foreign key

  declare getService: BelongsToManyGetAssociationsMixin<Service>;
  declare getServices: BelongsToManyGetAssociationsMixin<Service[]>;
  
  declare addService: BelongsToManyAddAssociationMixin<Service, Service['id']>;
  declare addServices: BelongsToManyAddAssociationMixin<
    Service[],
    Service['id'][]
  >;

  // declare getFeeTime: BelongsToManyGetAssociationsMixin<FeeTime>;
  // declare getFeeTimes: BelongsToManyGetAssociationsMixin<FeeTime[]>;
  
  // declare addFeeTime: BelongsToManyAddAssociationMixin<FeeTime, FeeTime['id']>;
  // declare addFeeTimes: BelongsToManyAddAssociationMixin<
  // FeeTime[],
  // FeeTime['id'][]
  // >;
}

export function AvailabilityOptionFactory(sequelize: Sequelize) {
  AvailabilityOption.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      differential_scheduling: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_collection_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'data_collection', // Matches table name
          key: 'id',
        },
      },
      report_writing_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'report_writing', // Matches table name
          key: 'id',
        },
      },
      client_presentation_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'client_presentation', // Matches table name
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'availability_options',
      tableName: 'availability_options',
      freezeTableName: true,
    }
  );

  return AvailabilityOption;
}
