import { Model, Optional } from 'sequelize';
import {
  PrimaryKey,
  Default,
  DataType,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  IsUUID,
} from 'sequelize-typescript';
// Define the attributes interface
export interface BaseAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// Define creation attributes (fields optional during creation)
type BaseCreationAttributes = Optional<
  BaseAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {};

export class BaseModel extends Model<BaseAttributes, BaseCreationAttributes> {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt: Date;
}
