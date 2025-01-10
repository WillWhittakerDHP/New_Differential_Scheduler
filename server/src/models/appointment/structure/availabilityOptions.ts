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

// import { DataCollection } from '../timeContent/dataCollection.js';
// import { ReportWriting } from '../timeContent/reportWriting.js';
// import { ClientPresentation } from '../timeContent/clientPresentation.js';

export class AvailabilityOption extends Model<
  InferAttributes<AvailabilityOption>,
  InferCreationAttributes<AvailabilityOption>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare differential_scheduling: boolean;
  declare visibility: boolean;
  declare description: string;
  declare base_sq_ft: number;
  declare data_collection_time_id?: number; // Foreign key
  declare report_writing_time_id?: number; // Foreign key
  declare client_presentation_time_id?: number; // Foreign key
  declare data_collection_fee_id?: number; // Foreign key
  declare report_writing_fee_id?: number; // Foreign key
  declare client_presentation_fee_id?: number; // Foreign key

  declare getService: BelongsToManyGetAssociationsMixin<Service>;
  declare getServices: BelongsToManyGetAssociationsMixin<Service[]>;

  declare addService: BelongsToManyAddAssociationMixin<Service, Service['id']>;
  declare addServices: BelongsToManyAddAssociationMixin<
    Service[],
    Service['id'][]
  >;

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
      base_sq_ft: {
        type: DataTypes.INTEGER,
      },
      data_collection_time_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'data_collection_time', // Matches table name
          key: 'id',
        },
      },
      report_writing_time_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'report_writing_time', // Matches table name
          key: 'id',
        },
      },
      client_presentation_time_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'client_presentation_time', // Matches table name
          key: 'id',
        },
      },
      data_collection_fee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'data_collection_fee', // Matches table name
          key: 'id',
        },
      },
      report_writing_fee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'report_writing_fee', // Matches table name
          key: 'id',
        },
      },
      client_presentation_fee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'client_presentation_fee', // Matches table name
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
