import { RoleTypes } from '@/api/user/user.enum';
import { BaseAttributes } from '@/database/models/base.model';
import { Optional } from 'sequelize';
import {
  Column,
  DataType,
  Table,
  AllowNull,
  Model,
} from 'sequelize-typescript';

// User attributes
type UserAttributes = BaseAttributes & {
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  image: string | null;
  role: string | null;
};

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'image' | 'role'
>;

@Table({
  tableName: 'users',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.BOOLEAN)
  isEmailVerified: boolean;

  @AllowNull
  @Column(DataType.STRING)
  image: string;

  @AllowNull
  @Column(DataType.ENUM('User', 'Admin', 'Stylist'))
  role: typeof RoleTypes;
}
