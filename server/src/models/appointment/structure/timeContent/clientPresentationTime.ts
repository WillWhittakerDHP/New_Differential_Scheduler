import { 
  Model, 
  DataTypes, 
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize, 
} from 'sequelize';


export class ClientPresentationTime extends Model<
  InferAttributes<ClientPresentationTime>,
  InferCreationAttributes<ClientPresentationTime>
> {
  declare id: CreationOptional<number>;
  declare on_site: boolean;
  declare base_time: number;
  declare rate_over_base_time: number;

}

export function ClientPresentationTimeFactory(sequelize: Sequelize): typeof ClientPresentationTime {
  ClientPresentationTime.init(
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
      modelName: 'client_presentation_time',
      tableName: 'client_presentation_time',
      freezeTableName: true,
    }
  );

  return ClientPresentationTime;
}