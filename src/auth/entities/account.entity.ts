import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '@/api/user/user.entity';
import { BaseModel } from '@/database/models/base.model';

@Table({
  tableName: 'accounts',
})
export class AccountEntity extends BaseModel {
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId!: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  user!: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  accountId!: string;

  @Column({
    type: DataType.STRING, // varchar
    allowNull: false,
  })
  providerId!: string; // Sequelize doesn't support literal union types in decorators

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  accessToken!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken!: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  accessTokenExpiresAt!: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  refreshTokenExpiresAt!: Date | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  scope!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  idToken!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password!: string | null;
}
