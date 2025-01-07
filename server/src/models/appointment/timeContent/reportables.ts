import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize';

export class Reportable extends Model<
InferAttributes<Reportable>,
InferCreationAttributes<Reportable>
>  {
  declare id: CreationOptional<number>;
  declare report_writing_id: number;
  declare reportable_type: string;

  }

export function ReportableFactory(sequelize: Sequelize) {
  Reportable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        unique: 'rw_unique_constraint',
        primaryKey: true,
        autoIncrement: true,
        // references: null,
      },
      report_writing_id: {
        type: DataTypes.INTEGER,
        unique: 'rw_unique_constraint',
      },
      reportable_type: {
        type: DataTypes.STRING,
        unique: 'rw_unique_constraint',
      },
    },
    { 
      sequelize, 
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'reportables',
      tableName: 'reportables',
      freezeTableName: true,
    }
  );

  return Reportable;
}
