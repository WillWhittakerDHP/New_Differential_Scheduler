import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  // ForeignKey,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  // BelongsToManyGetAssociationsMixinOptions,
  Sequelize,
} from 'sequelize';

import { Serviceable } from './serviceables.js';
// import { UserType } from '../../participantModels/userTypes.js';
// import { DwellingAdjustment } from '../../appointmentModels/contentModels/dwellingAdjustments.js';
// import { AdditionalService } from '../../appointmentModels/contentModels/additionalServices.js';
// import { AvailabilityOption } from '../../appointmentModels/contentModels/availabilityOptions.js';

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
  
  declare addServiceable: BelongsToManyAddAssociationMixin<Serviceable, Serviceable['ServiceId']>;
  declare addServiceables: BelongsToManyAddAssociationMixin<
  Serviceable[],
  Serviceable['ServiceId'][]
  >;

  /*
(alias) type BelongsToManyGetAssociationsMixin<TModel> = (options?: BelongsToManyGetAssociationsMixinOptions) => Promise<TModel[]>

interface ServiceInstance extends Sequelize.Instance<ServiceInstance, ServiceAttributes>, ServiceAttributes {
getServiceables: Sequelize.BelongsToManyGetAssociationsMixin<ServiceableInstance>;
 // setServiceables...
 // addServiceables...
  */
  // declare getServiceables(): BelongsToManyGetAssociationsMixin<Serviceable> (options: BelongsToManyGetAssociationsMixinOptions | undefined) => Promise<Serviceable[]>
  // {
  //   // const userTypes = await this.getUserTypes(options);
  //   // const additionalService = await this.getAdditionalServices(options);
  //   // const availabilityOption = await this.getAvailabilityOptions(options);
  //   // const dwellingAdjustments = await this.getDwellingAdjustments(options);
  //   // // Concat userType and additionalServices in a single array of Serviceables
  //   // return userTypes.concat(additionalServices).concat(availabilityOptions).concat(dwellingAdjustments);
  // }
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
    }
  );
  
  return Service;
}