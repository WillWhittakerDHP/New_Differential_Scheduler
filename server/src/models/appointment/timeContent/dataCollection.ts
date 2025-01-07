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
    
import { Collectable } from './collectables';
import { Service } from '../structure/serviceTypes';
import { AdditionalService } from '../structure/additionalServices';
import { AvailabilityOption } from '../structure/availabilityOptions';
import { DwellingAdjustment } from '../structure/dwellingAdjustments';

export class DataCollection extends Model<
  InferAttributes<DataCollection>,
  InferCreationAttributes<DataCollection>
> {
  declare id: CreationOptional<number>;
  declare on_site: boolean;
  declare base_sq_ft: number;
  declare base_time: number;
  declare rate_over_base_time: number;
  declare base_fee: number;
  declare rate_over_base_fee: number;
  
  declare getCollectable: BelongsToManyGetAssociationsMixin<Collectable>;
  declare getCollectables: BelongsToManyGetAssociationsMixin<Collectable[]>;
  service?: Service;
  additionalService?: AdditionalService;
  availabilityOption?: AvailabilityOption;
  dwellingAdjustment?: DwellingAdjustment;
  
  declare addCollectable: BelongsToManyAddAssociationMixin<Collectable, Collectable['data_collection_id']>;
  declare addCollectables: BelongsToManyAddAssociationMixin<
  Collectable[],
  Collectable['data_collection_id'][]
  >;
}

export function DataCollectionFactory(sequelize: Sequelize): typeof DataCollection {
  DataCollection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      on_site: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      base_sq_ft: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      base_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rate_over_base_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      base_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rate_over_base_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'data_collection',
      tableName: 'data_collection',
      freezeTableName: true,
    }
  );

  return DataCollection;
}