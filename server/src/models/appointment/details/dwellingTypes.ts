import { Model, DataTypes, 
  // Optional,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type ForeignKey,
  // type BelongsToManyAddAssociationMixin,
  type Sequelize } from 'sequelize';
import { Descriptions } from './descriptions.js';
  

export class DwellingType extends Model<
  InferAttributes<DwellingType>,
  InferCreationAttributes<DwellingType>
> {
  declare dwelling_type_id: CreationOptional<number>;
  declare dwelling_type_name: string;
  declare id: ForeignKey<Descriptions['id']>;

  // TODO What's this?
  // //  Since TS cannot determine model associations at compile time, we need to declare the association methods here. These will not exist until `Model.init` was called.
  //   declare addReaders: BelongsToManyAddAssociationMixin<
  //   Reader[],
  //   Reader['id'][]
  // >;
  // declare addReader: BelongsToManyAddAssociationMixin<Reader, Reader['id']>;
}

export function DwellingTypeFactory(sequelize: Sequelize): typeof DwellingType {
  DwellingType.init(
    {
      dwelling_type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dwelling_type_name: {
        type: DataTypes.STRING,
      },
      // id: {
      //   type: DataTypes.STRING,
      // },
    },
    {
      sequelize,
      // Manually define the table name
      modelName: 'dwelling_types',
      // Set to false to remove the `created_at` and `updated_at` columns
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return DwellingType;
}