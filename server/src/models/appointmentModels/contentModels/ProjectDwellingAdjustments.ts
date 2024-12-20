import { Model, DataTypes, 
  // Optional,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type ForeignKey,
  type BelongsToManyAddAssociationMixin,
  type Sequelize } from 'sequelize';
  

import type { AppointmentBlock } from '../structureModels/ProjectAppointmentBlocks';


export class DwellingAdjustment extends Model<
  InferAttributes<DwellingAdjustment>,
  InferCreationAttributes<DwellingAdjustment>
> {
  declare dwelling_adjustment_id: CreationOptional<number>;
  declare dwelling_type: string;
  declare base_sq_ft: number;
  declare data_collection: ForeignKey<AppointmentBlock['appointment_block_id']>;
  declare report_writing: ForeignKey<AppointmentBlock['appointment_block_id']>;
  declare client_presentation: ForeignKey<AppointmentBlock['appointment_block_id']>;


  // async calculateTime(newPassword: string): Promise<void> {
  //   this.password = await bcrypt.hash(newPassword, 10);
  //   const book = await Book.findByPk(appointment_blocks_id);base_time
  // }

  declare addAppointmentBlock: BelongsToManyAddAssociationMixin<AppointmentBlock, AppointmentBlock['appointment_block_id']>;
  declare addAppointmentBlocks: BelongsToManyAddAssociationMixin<
  AppointmentBlock[],
  AppointmentBlock['appointment_block_id'][]
  >;
}

export function DwellingAdjustmentFactory(sequelize: Sequelize): typeof DwellingAdjustment {
  DwellingAdjustment.init(
    {
      dwelling_adjustment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dwelling_type: {
        type: DataTypes.STRING,
      },
      base_sq_ft: {
        type: DataTypes.INTEGER,
      },
      // dwelling_type_id: {
      //   type: DataTypes.STRING,
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
      tableName: 'dwelling_adjustments',
      // Set to false to remove the `created_at` and `updated_at` columns
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return DwellingAdjustment;
}
