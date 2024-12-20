import { Model, DataTypes, 
  // Optional,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type ForeignKey,
  type BelongsToManyAddAssociationMixin,
  type Sequelize } from 'sequelize';

  
import { AppointmentBlock } from '../structureModels/ProjectAppointmentBlocks';


export class Service extends Model<
  InferAttributes<Service>,
  InferCreationAttributes<Service>
> {
  declare service_id: CreationOptional<number>;
  declare title: string;
  declare differential_scheduling: boolean;
  declare data_collection: ForeignKey<AppointmentBlock['appointment_block_id']>;
  declare report_writing: ForeignKey<AppointmentBlock['appointment_block_id']>;
  declare client_presentation: ForeignKey<AppointmentBlock['appointment_block_id']>;

  declare addAppointmentBlock: BelongsToManyAddAssociationMixin<AppointmentBlock, AppointmentBlock['appointment_block_id']>;
  declare addAppointmentBlocks: BelongsToManyAddAssociationMixin<
  AppointmentBlock[],
  AppointmentBlock['appointment_block_id'][]
  >;
}

export function ServiceFactory(sequelize: Sequelize): typeof Service {
  Service.init(
    {
      service_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      // can_be_scheduled: {
      //   type: DataTypes.BOOLEAN,
      // },
      differential_scheduling: {
        type: DataTypes.BOOLEAN,
      },
      // ui_description_set_id: {
      //   type: DataTypes.INTEGER,
      // },
      // early_arrival: {
      //   type: DataTypes.INTEGER,
      // },
      // data_collection: {
      //   type: DataTypes.INTEGER,
      // },
      // report_writing: {
      //   type: DataTypes.INTEGER,
      // },
      // client_presentation: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      sequelize,
      // Manually define the table name
      tableName: 'services',
      // Set to false to remove the `created_at` and `updated_at` columns
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return Service;
}
