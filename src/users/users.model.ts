import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model ";

interface UserCreationAttrs {
  email: string;
  password: string;
  activationLink: string;
}
@Table({ tableName: "users", timestamps: false })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: "1",
    description: "Unique identificator",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "user@mail.com",
    description: "Email",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: "b0fc9ffd-816b-42fc-b7de-9291ad8be01d ",
    description: "Activation link",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  activationLink: string;

  @ApiProperty({
    example: "b0fc9ffd-816b-42fc-b7de-9291ad8be01d ",
    description: "User password",
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: "false",
    description: "Banned status",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  @ApiProperty({
    example: "false",
    description: "Activation status",
  })
  isActivated: boolean;

  @ApiProperty({
    example: "Spam",
    description: "Ban reason",
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles:Role[]
}
