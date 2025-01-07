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
  
import { Presentable } from './presentables';
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
  
  declare getPresentable: BelongsToManyGetAssociationsMixin<Presentable>;
  declare getPresentables: BelongsToManyGetAssociationsMixin<Presentable[]>;
  service?: Service;
  additionalService?: AdditionalService;
  availabilityOption?: AvailabilityOption;
  dwellingAdjustment?: DwellingAdjustment;
  
  declare addPresentable: BelongsToManyAddAssociationMixin<Presentable, Presentable['client_presentation_id']>;
  declare addPresentables: BelongsToManyAddAssociationMixin<
  Presentable[],
  Presentable['client_presentation_id'][]
  >;}

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