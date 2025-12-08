import { Model } from 'sequelize';
import {
  Table,
  PrimaryKey,
  Default,
  DataType,
  Column,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  IsUUID,
} from 'sequelize-typescript';

// Verification Entity
@Table({
  tableName: 'verification',
  timestamps: true,
})
export class Verification extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @Column(DataType.STRING)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  identifier!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  value!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  expiresAt!: Date;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
