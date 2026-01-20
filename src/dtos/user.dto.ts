import { IsString, IsEmail, IsInt } from "class-validator";

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  roleId: number;
}

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}