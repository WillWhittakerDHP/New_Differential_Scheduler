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

import { DataCollection } from '../timeContent/dataCollection.js';
import { ReportWriting } from '../timeContent/reportWriting.js';
import { ClientPresentation } from '../timeContent/clientPresentation.js';

export class Service extends Model<
InferAttributes<Service>,
InferCreationAttributes<Service>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare differential_scheduling: boolean;
  declare visibility: boolean;
  declare description: string;

  declare getServiceable: BelongsToManyGetAssociationsMixin<Serviceable>;
  declare getServiceables: BelongsToManyGetAssociationsMixin<Serviceable[]>;
  DwellingAdjustments?: DwellingAdjustment;
  AdditionalServices?: AdditionalService;
  AvailabilityOptions?: AvailabilityOption;
  
  declare addServiceable: BelongsToManyAddAssociationMixin<Serviceable, Serviceable['service_id']>;
  declare addServiceables: BelongsToManyAddAssociationMixin<
  Serviceable[],
  Serviceable['service_id'][]
  >;

  declare getDataCollection: BelongsToManyGetAssociationsMixin<DataCollection>;
  declare getDataCollections: BelongsToManyGetAssociationsMixin<DataCollection[]>;
  DataCollections?: DataCollection[];
  
  declare addDataCollection: BelongsToManyAddAssociationMixin<DataCollection, DataCollection['id']>;
  declare addDataCollections: BelongsToManyAddAssociationMixin<
  DataCollection[],
  DataCollection['id'][]
  >;

  declare getReportWriting: BelongsToManyGetAssociationsMixin<ReportWriting>;
  declare getReportWritings: BelongsToManyGetAssociationsMixin<ReportWriting[]>;
  ReportWritings?: ReportWriting[];
  
  declare addReportWriting: BelongsToManyAddAssociationMixin<ReportWriting, ReportWriting['id']>;
  declare addReportWritings: BelongsToManyAddAssociationMixin<
  ReportWriting[],
  ReportWriting['id'][]
  >;

  declare getClientPresentation: BelongsToManyGetAssociationsMixin<ClientPresentation>;
  declare getClientPresentations: BelongsToManyGetAssociationsMixin<ClientPresentation[]>;
  ClientPresentations?: ClientPresentation[];
  
  declare addClientPresentation: BelongsToManyAddAssociationMixin<ClientPresentation, ClientPresentation['id']>;
  declare addClientPresentations: BelongsToManyAddAssociationMixin<
  ClientPresentation[],
  ClientPresentation['id'][]
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
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