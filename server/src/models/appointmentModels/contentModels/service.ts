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

import { UserType } from '../../participantModels/userTypes';

export class Service extends Model<
  InferAttributes<Service>,
  InferCreationAttributes<Service>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare differential_scheduling: boolean;
  declare can_be_scheduled: boolean;
  // declare ui_description_set_id: ForeignKey<UIDescription['ui_description_set_id']>;
  // declare appointment_part_1: ForeignKey<TimeBlockSet['time_block_set_id']>;
  // declare appointment_part_2: ForeignKey<TimeBlockSet['time_block_set_id']>;
  // declare appointment_part_3: ForeignKey<TimeBlockSet['time_block_set_id']>;
  // declare appointment_part_4: ForeignKey<TimeBlockSet['time_block_set_id']>;

  declare addUserType: BelongsToManyAddAssociationMixin<UserType, UserType['id']>;
  declare addUserTypes: BelongsToManyAddAssociationMixin<
    UserType[],
    UserType['id'][]
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
      can_be_scheduled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      // ui_description_set_id: {
      //   type: DataTypes.INTEGER,
      // },
      // appointment_part_1: {
      //   type: DataTypes.INTEGER,
      // },
      // appointment_part_2: {
      //   type: DataTypes.INTEGER,
      // },
      // appointment_part_3: {
      //   type: DataTypes.INTEGER,
      // },
      // appointment_part_4: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'Services',
    }
  );

  return Service;
}
