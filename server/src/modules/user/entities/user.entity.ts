import { Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  age: number;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @CreatedAt public createdDate: Date;

  @UpdatedAt public updatedDate: Date;

  @DeletedAt public deletedDate: Date;
}
