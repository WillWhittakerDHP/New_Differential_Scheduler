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

import type { Service } from './serviceTypes.js';

export class UserType extends Model<
InferAttributes<UserType>,
InferCreationAttributes<UserType>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare icon: string;
  declare description: string;
  declare visibility: boolean;
  
  declare getService: BelongsToManyGetAssociationsMixin<Service>;
  declare getServices: BelongsToManyGetAssociationsMixin<Service[]>;
  Services?: Service[];
  
  declare addService: BelongsToManyAddAssociationMixin<Service, Service['id']>;
  declare addServices: BelongsToManyAddAssociationMixin<
  Service[],
  Service['id'][]
  >;
  
// async getServicesByUserTypeID(services: Service[]): Promise<Service[]> {
//   const visibleServices: Service[] = services.map((service) => {
//     return {
//       id: service.id,
//       name: service.name,
//       description: service.description,
//       visibility: service.visibility,
//     };
//   });
//   return visibleServices;
// }

}

export function UserTypeFactory(sequelize: Sequelize) {
  UserType.init(
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
      icon: {
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
      modelName: 'user_types',
      tableName: 'user_types',
      freezeTableName: true,
    }
  );

  return UserType;
}
