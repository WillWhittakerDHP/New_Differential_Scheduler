import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  // type ForeignKey,
  type BelongsToManyAddAssociationMixin,
  type Sequelize,
} from 'sequelize';

import type { Service } from './service';
// import type { TimeBlockSet } from '../structureModels/timeBlockSets';
// import { UIDescription } from '../structureModels/uIDescriptions';

export class AdditionalService extends Model<
  InferAttributes<AdditionalService>,
  InferCreationAttributes<AdditionalService>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare differential_scheduling: boolean;
  declare visibility: boolean;
  declare description: string;
  declare Service: BelongsToManyAddAssociationMixin<Service, Service['id']>;
    declare addServiceTypes: BelongsToManyAddAssociationMixin<
      Service [],
      Service['id'][]
    >;
}

export function AdditionalServiceFactory(sequelize: Sequelize): typeof AdditionalService {
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
      visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'AdditionalServices',
    }
  );

  return AdditionalService;
}