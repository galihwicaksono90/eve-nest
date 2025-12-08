import { User } from '@/api/user/user.entity';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  IsUUID,
  Default,
  AllowNull,
} from 'sequelize-typescript';

// Session Entity
@Table({
  tableName: 'sessions',
  timestamps: true,
})
export class Session extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @Column(DataType.STRING)
  declare id: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.STRING)
  userId!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  token!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  expiresAt!: Date;

  @AllowNull(true)
  @Column(DataType.STRING)
  ipAddress?: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  userAgent?: string;

  // Admin plugin field for impersonation
  @AllowNull(true)
  @Column(DataType.STRING)
  impersonatedBy?: string;

  // Associations
  @BelongsTo(() => User)
  user?: User;
}
