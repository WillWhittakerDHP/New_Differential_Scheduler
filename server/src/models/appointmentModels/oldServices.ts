// import {
//   Model,
//   DataTypes,
//   type InferAttributes,
//   type InferCreationAttributes,
//   type CreationOptional,
//   // type ForeignKey,
//   type BelongsToManyAddAssociationMixin,
//   type Sequelize,
// } from 'sequelize';

// import { UserType } from '../../participantModels/userTypes';
// import { AdditionalService } from './additionalServices';
// import { AvailabilityOption } from './availabilityOptions';
// import { DwellingAdjustment } from './dwellingAdjustments';

// export class Service extends Model<
//   InferAttributes<Service>,
//   InferCreationAttributes<Service>
// > {
//   declare id: CreationOptional<number>;
//   declare name: string;
//   declare differential_scheduling: boolean;
//   declare visibility: boolean;
//   declare description: string;

//   declare addUserType: BelongsToManyAddAssociationMixin<UserType, UserType['id']>;
//   declare addUserTypes: BelongsToManyAddAssociationMixin<
//     UserType[],
//     UserType['id'][]
//   >;

//   declare addAdditionalService: BelongsToManyAddAssociationMixin<AdditionalService, AdditionalService['id']>;
//   declare addAdditionalServices: BelongsToManyAddAssociationMixin<
//     UserType[],
//     UserType['id'][]
//   >;

//   declare addAvailabilityOption: BelongsToManyAddAssociationMixin<AvailabilityOption, AvailabilityOption['id']>;
//   declare addAvailabilityOptions: BelongsToManyAddAssociationMixin<
//     UserType[],
//     UserType['id'][]
//   >;

//   declare addDwellingAdjustment: BelongsToManyAddAssociationMixin<DwellingAdjustment, DwellingAdjustment['id']>;
//   declare addDwellingAdjustments: BelongsToManyAddAssociationMixin<
//     UserType[],
//     UserType['id'][]
//   >;
// }

// export function ServiceFactory(sequelize: Sequelize) {
//   Service.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       differential_scheduling: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       visibility: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       timestamps: false,
//       underscored: true,
//       schema: 'public',
//       modelName: 'services',
//     }
//   );

//   return Service;
// }
