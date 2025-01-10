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

import { Serviceable } from './serviceables.js';
import { DwellingAdjustment } from './dwellingAdjustments.js';
import { AdditionalService } from './additionalServices.js';
import { AvailabilityOption } from './availabilityOptions.js';

// import { DataCollection } from '../timeContent/dataCollection.js';
// import { ReportWriting } from '../timeContent/reportWriting.js';
// import { ClientPresentation } from '../timeContent/clientPresentation.js';

export class Service extends Model<
InferAttributes<Service>,
InferCreationAttributes<Service>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare differential_scheduling: boolean;
  declare description: string;
  declare visibility: boolean;
  declare base_sq_ft: number;
  declare data_collection_time_id?: number; // Foreign key
  declare report_writing_time_id?: number; // Foreign key
  declare client_presentation_time_id?: number; // Foreign key
  declare data_collection_fee_id?: number; // Foreign key
  declare report_writing_fee_id?: number; // Foreign key
  declare client_presentation_fee_id?: number; // Foreign key
  declare AdditionalServices?: AdditionalService[];
  declare AvailabilityOptions?: AvailabilityOption[];
  declare DwellingAdjustments?: DwellingAdjustment[];

  declare getServiceable: BelongsToManyGetAssociationsMixin<Serviceable>;
  declare getServiceables: BelongsToManyGetAssociationsMixin<Serviceable[]>;
  
  declare addServiceable: BelongsToManyAddAssociationMixin<Serviceable, Serviceable['service_id']>;
  declare addServiceables: BelongsToManyAddAssociationMixin<
  Serviceable[],
  Serviceable['service_id'][]
  >;


}

export function ServiceFactory(sequelize: Sequelize) {
  Service.init(
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
      },    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'services',
      tableName: 'services',
      freezeTableName: true,
    }
  );
  
  return Service;
}