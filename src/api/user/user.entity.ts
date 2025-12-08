import { RoleEnum } from '@/api/user/user.enum';
import { Account } from '@/auth/entities/account.entity';
import { Session } from '@/auth/entities/session.entity';
// import { BaseAttributes } from '@/database/models/base.model';
// import { Optional } from 'sequelize';
import {
  Column,
  DataType,
  Table,
  AllowNull,
  Model,
  HasMany,
  Default,
  IsUUID,
  PrimaryKey,
} from 'sequelize-typescript';

// // User attributes
// type UserAttributes = BaseAttributes & {
//   email: string;
//   firstName: string;
//   lastName: string;
//   isEmailVerified: boolean;
//   image: string | null;
//   role: string | null;
// };

// type UserCreationAttributes = Optional<
//   UserAttributes,
//   'id' | 'createdAt' | 'updatedAt' | 'image' | 'role'
// >;

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @Column(DataType.STRING)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  emailVerified!: boolean;

  @AllowNull(true)
  @Column(DataType.STRING)
  image?: string;

  // Admin plugin fields
  @AllowNull(true)
  @Default(RoleEnum.USER)
  @Column(DataType.ENUM(...Object.values(RoleEnum)))
  role?: RoleEnum; // Possible values: 'admin', 'user', 'stylist'

  @AllowNull(true)
  @Default(false)
  @Column(DataType.BOOLEAN)
  banned?: boolean;

  @AllowNull(true)
  @Column(DataType.STRING)
  banReason?: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  banExpires?: Date;

  // // Associations
  // @HasMany(() => Session)
  // sessions?: Session[];

  // @HasMany(() => Account)
  // accounts?: Account[];
}
// @Table({
//   tableName: 'users',
// })
// export class User extends Model<UserAttributes, UserCreationAttributes> {
//   @Column(DataType.STRING)
//   email: string;
//
//   @Column(DataType.STRING)
//   firstName: string;
//
//   @Column(DataType.STRING)
//   lastName: string;
//
//   @Column(DataType.BOOLEAN)
//   isEmailVerified: boolean;
//
//   @AllowNull
//   @Column(DataType.STRING)
//   image: string;
//
//   // better auth role fields
//   @AllowNull
//   @Column(DataType.ENUM('User', 'Admin', 'Stylist'))
//   role: typeof RoleTypes;
//
//   @AllowNull
//   @Column(DataType.BOOLEAN)
//   banned: boolean;
//
//   @AllowNull
//   @Column(DataType.STRING)
//   banReason: string;
//
//   @AllowNull
//   @Column(DataType.DATE)
//   banExpires: Date;
// }
