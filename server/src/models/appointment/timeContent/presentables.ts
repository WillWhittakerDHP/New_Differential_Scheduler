import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize';

export class Presentable extends Model<
InferAttributes<Presentable>,
InferCreationAttributes<Presentable>
>  {
  declare id: CreationOptional<number>;
  declare client_presentation_id: number;
  declare presentable_type: string;

  }

export function PresentableFactory(sequelize: Sequelize) {
  Presentable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        unique: 'cp_unique_constraint',
        primaryKey: true,
        autoIncrement: true,
        // references: null,
      },
      client_presentation_id: {
        type: DataTypes.INTEGER,
        unique: 'cp_unique_constraint',
      },
      presentable_type: {
        type: DataTypes.STRING,
        unique: 'cp_unique_constraint',
      },
    },
    { 
      sequelize, 
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'presentables',
      tableName: 'presentables',
      freezeTableName: true,
    }
  );

  return Presentable;
}
