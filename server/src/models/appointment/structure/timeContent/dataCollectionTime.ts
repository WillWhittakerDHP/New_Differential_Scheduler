import { 
  Model, 
  DataTypes, 
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize, 
} from 'sequelize';


export class DataCollectionTime extends Model<
  InferAttributes<DataCollectionTime>,
  InferCreationAttributes<DataCollectionTime>
> {
  declare id: CreationOptional<number>;

  declare on_site: boolean;
  declare base_time: number;
  declare rate_over_base_time: number;
  
}

export function DataCollectionTimeFactory(sequelize: Sequelize): typeof DataCollectionTime {
  DataCollectionTime.init(
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
      base_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rate_over_base_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'data_collection_time',
      tableName: 'data_collection_time',
      freezeTableName: true,
    }
  );

  return DataCollectionTime;
}