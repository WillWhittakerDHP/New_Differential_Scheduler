import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize';
  

export class Descriptions extends Model<
  InferAttributes<Descriptions>,
  InferCreationAttributes<Descriptions>
> {
  declare id: CreationOptional<number>;
  declare userType: string;
  declare services: string[];
  declare additionalServices: string[];
  declare availabilityOptions: string[];
}

export function DescriptionsFactory(sequelize: Sequelize): typeof Descriptions {
  Descriptions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userType:  {
        type: DataTypes.STRING,
      },
      services:  {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      additionalServices: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      }, 
      availabilityOptions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'descriptions',
      tableName: 'descriptions',
      freezeTableName: true,
    }
  );

  return Descriptions;
}