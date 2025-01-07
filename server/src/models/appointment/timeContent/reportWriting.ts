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
  
import { Reportable } from './reportables';
import { Service } from '../structure/serviceTypes';
import { AdditionalService } from '../structure/additionalServices';
import { AvailabilityOption } from '../structure/availabilityOptions';
import { DwellingAdjustment } from '../structure/dwellingAdjustments';

export class ReportWriting extends Model<
  InferAttributes<ReportWriting>,
  InferCreationAttributes<ReportWriting>
> {
  declare id: CreationOptional<number>;
  declare on_site: boolean;
  declare base_sq_ft: number;
  declare base_time: number;
  declare rate_over_base_time: number;
  declare base_fee: number;
  declare rate_over_base_fee: number;

  declare getReportable: BelongsToManyGetAssociationsMixin<Reportable>;
  declare getReportables: BelongsToManyGetAssociationsMixin<Reportable[]>;
  service?: Service;
  additionalService?: AdditionalService;
  availabilityOption?: AvailabilityOption;
  dwellingAdjustment?: DwellingAdjustment;
  
  declare addReportable: BelongsToManyAddAssociationMixin<Reportable, Reportable['report_writing_id']>;
  declare addReportables: BelongsToManyAddAssociationMixin<
  Reportable[],
  Reportable['report_writing_id'][]
  >;
}

export function ReportWritingFactory(sequelize: Sequelize): typeof ReportWriting {
  ReportWriting.init(
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
      modelName: 'report_writing',
      tableName: 'report_writing',
      freezeTableName: true,
    }
  );

  return ReportWriting;
}