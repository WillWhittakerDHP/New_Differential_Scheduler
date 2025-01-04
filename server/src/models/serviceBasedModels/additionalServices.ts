import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyAddAssociationMixin,
  // BelongsToManyGetAssociationsMixin,
  Sequelize,
} from 'sequelize';

import { Service } from './services.js';

export class AdditionalService extends Model<
  InferAttributes<AdditionalService>,
  InferCreationAttributes<AdditionalService>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare differential_scheduling: boolean;
  declare visibility: boolean;
  declare description: string;

  // declare getService: BelongsToManyGetAssociationsMixin<Service>;
  // declare getServices: BelongsToManyGetAssociationsMixin<Service[]>;

  declare addService: BelongsToManyAddAssociationMixin<Service, Service['id']>;
  declare addServices: BelongsToManyAddAssociationMixin<
    Service[],
    Service['id'][]
  >;
}

export function AdditionalServiceFactory(sequelize: Sequelize) {
  AdditionalService.init(
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
      modelName: 'additional_services',
      tableName: 'additional_services',
      freezeTableName: true,
    }
  );

  return AdditionalService;
}
