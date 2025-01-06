import { Model, DataTypes, 
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type Sequelize,
  ForeignKey 
  } from 'sequelize';
  
  import { Service } from '../structure/serviceTypes';
  import { AdditionalService } from '../structure/additionalServices';
  import { AvailabilityOption } from '../structure/availabilityOptions';
  import { DwellingAdjustment } from '../structure/dwellingAdjustments';
  

export class ClientPresentation extends Model<
  InferAttributes<ClientPresentation>,
  InferCreationAttributes<ClientPresentation>
> {
  declare id: CreationOptional<number>;
  declare on_site: boolean;
  declare base_sq_ft: number;
  declare base_time: number;
  declare rate_over_base_time: number;
  declare base_fee: number;
  declare rate_over_base_fee: number;
  declare service?: ForeignKey<Service['id']>
  declare additionalService?: ForeignKey<AdditionalService['id']>
  declare availabilityOption?: ForeignKey<AvailabilityOption['id']>
  declare dwellingAdjustment?: ForeignKey<DwellingAdjustment['id']>

  declare setService: (service: number | object) => Promise<void>;
}

export function ClientPresentationFactory(sequelize: Sequelize): typeof ClientPresentation {
  ClientPresentation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      on_site: {
        type: DataTypes.BOOLEAN,
      },
      base_sq_ft: {
        type: DataTypes.INTEGER,
      },
      base_time: {
        type: DataTypes.INTEGER,
      },
      rate_over_base_time: {
        type: DataTypes.INTEGER,
      },
      base_fee: {
        type: DataTypes.INTEGER,
      },
      rate_over_base_fee: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'client_presentation',
      tableName: 'client_presentation',
      freezeTableName: true,
    }
  );

  return ClientPresentation;
}