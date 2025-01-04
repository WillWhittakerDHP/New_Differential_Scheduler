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

import type { Service } from './services.js';

export class DwellingAdjustment extends Model<
  InferAttributes<DwellingAdjustment>,
  InferCreationAttributes<DwellingAdjustment>
> {
  declare id: CreationOptional<number>;
  declare name: string;
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

export function DwellingAdjustmentFactory(sequelize: Sequelize) {
  DwellingAdjustment.init(
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
      modelName: 'dwelling_adjustments',
      tableName: 'dwelling_adjustments',
      freezeTableName: true,
    }
  );

  return DwellingAdjustment;
}
