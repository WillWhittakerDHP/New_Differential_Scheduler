import { 
  Model, 
  DataTypes, 
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize, 
} from 'sequelize';


export class ClientPresentationFee extends Model<
  InferAttributes<ClientPresentationFee>,
  InferCreationAttributes<ClientPresentationFee>
> {
  declare id: CreationOptional<number>;

  declare base_fee: number;
  declare rate_over_base_fee: number;

}

export function ClientPresentationFeeFactory(sequelize: Sequelize): typeof ClientPresentationFee {
  ClientPresentationFee.init(
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
      modelName: 'client_presentation_fee',
      tableName: 'client_presentation_fee',
      freezeTableName: true,
    }
  );

  return ClientPresentationFee;
}