import { Model, DataTypes, 
  // Optional,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type ForeignKey,
  type BelongsToManyAddAssociationMixin,
  type Sequelize } from 'sequelize';
  
import type { Service } from '../appointmentModels/contentModels/services';

export class UserType extends Model<
  InferAttributes<UserType>,
  InferCreationAttributes<UserType>
> {
  declare user_type_id: CreationOptional<number>;
  declare visibility: boolean;
  declare user_type: string;
  declare icon: string;
  declare user_description: string;
  declare available_service_1: ForeignKey<Service['service_id']>;
  declare available_service_2: ForeignKey<Service['service_id']>;
  declare available_service_3: ForeignKey<Service['service_id']>;
  declare available_service_4: ForeignKey<Service['service_id']>;

  //  Since TS cannot determine model associations at compile time, we need to declare the association methods here. These will not exist until `Model.init` was called.
  declare addService: BelongsToManyAddAssociationMixin<Service, Service['service_id']>;
  declare addServices: BelongsToManyAddAssociationMixin<
  Service[],
  Service['service_id'][]
  >;
}

export function UserTypeFactory(sequelize: Sequelize): typeof UserType {
  UserType.init(
    {
      user_type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_type: {
        type: DataTypes.STRING,
      },
      visibility: {
        type: DataTypes.BOOLEAN,
      },
      icon: {
        type: DataTypes.STRING,
      },
      user_description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      // Manually define the table name
      modelName: 'user_types',
      // Set to false to remove the `created_at` and `updated_at` columns
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return UserType;
}