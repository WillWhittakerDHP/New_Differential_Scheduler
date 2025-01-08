import { 
  Model, 
  DataTypes, 
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize, 
} from 'sequelize';
  
// import { Service } from '../structure/serviceTypes';
// import { AdditionalService } from '../structure/additionalServices';
// import { AvailabilityOption } from '../structure/availabilityOptions';
// import { DwellingAdjustment } from '../structure/dwellingAdjustments';

export class ClientPresentation extends Model<
  InferAttributes<ClientPresentation>,
  InferCreationAttributes<ClientPresentation>
> {
  declare id: CreationOptional<number>;
  // declare service_id: number; // Foreign key
  // declare additional_service_id?: number; // Foreign key
  // declare availability_option_id?: number; // Foreign key
  // declare dwelling_adjustment_id?: number; // Foreign key
  declare on_site: boolean;
  declare base_sq_ft: number;
  declare base_time: number;
  declare rate_over_base_time: number;
  declare base_fee: number;
  declare rate_over_base_fee: number;

}

export function ClientPresentationFactory(sequelize: Sequelize): typeof ClientPresentation {
  ClientPresentation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // service_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'services', // Matches table name
      //     key: 'id',
      //   },
      // },
      // additional_service_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'additional_services', // Matches table name
      //     key: 'id',
      //   },
      // },
      // availability_option_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'availability_options', // Matches table name
      //     key: 'id',
      //   },
      // },
      // dwelling_adjustment_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'dwelling_adjustments', // Matches table name
      //     key: 'id',
      //   },
      // },
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