import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  // type CreationOptional,
  type Sequelize,
} from 'sequelize';

export class Serviceable extends Model<
InferAttributes<Serviceable>,
InferCreationAttributes<Serviceable>
>  {
  declare ServiceId: number;
  declare ServiceableId: number;
  declare ServiceableType: string;
  }

export function ServiceableFactory(sequelize: Sequelize) {
  Serviceable.init(
    {
      ServiceId: {
        type: DataTypes.INTEGER,
        unique: 'ss_unique_constraint',
      },
      ServiceableId: {
        type: DataTypes.INTEGER,
        unique: 'ss_unique_constraint',
        // references: null,
      },
      ServiceableType: {
        type: DataTypes.STRING,
        unique: 'ss_unique_constraint',
      },
    },
    { 
      sequelize, 
      timestamps: false,
      underscored: true,
      schema: 'public',
      modelName: 'Serviceable',
    }
  );

  return Serviceable;
}
