import { 
  Model, 
  DataTypes, 
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize, 
} from 'sequelize';


export class ReportWritingTime extends Model<
  InferAttributes<ReportWritingTime>,
  InferCreationAttributes<ReportWritingTime>
> {
  declare id: CreationOptional<number>;

  declare on_site: boolean;
  declare base_time: number;
  declare rate_over_base_time: number;

}

export function ReportWritingTimeFactory(sequelize: Sequelize): typeof ReportWritingTime {
  ReportWritingTime.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      on_site: {
        type: DataTypes.BOOLEAN,
      },
      base_time: {
        type: DataTypes.INTEGER,
      },
      rate_over_base_time: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'report_writing_time',
      tableName: 'report_writing_time',
      freezeTableName: true,
    }
  );

  return ReportWritingTime;
}