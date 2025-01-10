import { 
  Model, 
  DataTypes, 
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize, 
} from 'sequelize';
  

export class ReportWritingFee extends Model<
  InferAttributes<ReportWritingFee>,
  InferCreationAttributes<ReportWritingFee>
> {
  declare id: CreationOptional<number>;
  declare base_fee: number;
  declare rate_over_base_fee: number;

}

export function ReportWritingFeeFactory(sequelize: Sequelize): typeof ReportWritingFee {
  ReportWritingFee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      modelName: 'report_writing_fee',
      tableName: 'report_writing_fee',
      freezeTableName: true,
    }
  );

  return ReportWritingFee;
}