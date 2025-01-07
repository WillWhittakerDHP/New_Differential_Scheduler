import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from 'sequelize';

export class Collectable extends Model<
InferAttributes<Collectable>,
InferCreationAttributes<Collectable>
>  {
  declare id: CreationOptional<number>;
  declare data_collection_id: number;
  declare collectable_type: string;
  }

export function CollectableFactory(sequelize: Sequelize) {
  Collectable.init(
    {
      id: {
        type: DataTypes.INTEGER,
        unique: 'dc_unique_constraint',
        primaryKey: true,
        autoIncrement: true,
        // references: null,
      },
      data_collection_id: {
        type: DataTypes.INTEGER,
        unique: 'dc_unique_constraint',
      },
      collectable_type: {
        type: DataTypes.STRING,
        unique: 'dc_unique_constraint',
      },
    },
    { 
      sequelize, 
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'collectables',
      tableName: 'collectables',
      freezeTableName: true,
    }
  );

  return Collectable;
}
