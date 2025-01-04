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

export class AvailabilityOption extends Model<
  InferAttributes<AvailabilityOption>,
  InferCreationAttributes<AvailabilityOption>
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
      modelName: 'availability_options',
      tableName: 'availability_options',
      freezeTableName: true,
    }
  );

  return AvailabilityOption;
}
