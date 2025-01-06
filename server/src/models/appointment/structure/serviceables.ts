import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize';

export class Serviceable extends Model<
InferAttributes<Serviceable>,
InferCreationAttributes<Serviceable>
>  {
  declare id: CreationOptional<number>;
  declare service_id: number;
  declare serviceable_type: string;

  }

export function ServiceableFactory(sequelize: Sequelize) {
  Serviceable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        unique: 'ss_unique_constraint',
        primaryKey: true,
        autoIncrement: true,
        // references: null,
      },
      service_id: {
        type: DataTypes.INTEGER,
        unique: 'ss_unique_constraint',
      },
      serviceable_type: {
        type: DataTypes.STRING,
        unique: 'ss_unique_constraint',
      },
    },
    { 
      sequelize, 
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'serviceables',
      tableName: 'serviceables',
      freezeTableName: true,
    }
  );

  return Serviceable;
}
