import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}
