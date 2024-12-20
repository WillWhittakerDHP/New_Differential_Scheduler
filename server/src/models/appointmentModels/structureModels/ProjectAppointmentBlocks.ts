import { Model, DataTypes, 
  // Optional,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  // type ForeignKey,
  // type BelongsToManyAddAssociationMixin,
  type Sequelize } from 'sequelize';
  

export class AppointmentBlock extends Model<
  InferAttributes<AppointmentBlock>,
  InferCreationAttributes<AppointmentBlock>
> {
  declare appointment_block_id: CreationOptional<number>;
  declare base_time: number;
  declare rate_over_base_time: number;
  declare base_fee: number;
  declare rate_over_base_fee: number;

  // TODO What's this?
  // //  Since TS cannot determine model associations at compile time, we need to declare the association methods here. These will not exist until `Model.init` was called.
  //   declare addReaders: BelongsToManyAddAssociationMixin<
  //   Reader[],
  //   Reader['id'][]
  // >;
  // declare addReader: BelongsToManyAddAssociationMixin<Reader, Reader['id']>;
}

export function AppointmentBlockFactory(sequelize: Sequelize): typeof AppointmentBlock {
  AppointmentBlock.init(
    {
      appointment_block_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      // Manually define the table name
      tableName: 'appointment_block_',
      // Set to false to remove the `created_at` and `updated_at` columns
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return AppointmentBlock;
}
