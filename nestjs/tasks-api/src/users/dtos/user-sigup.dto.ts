import { IsEmail, IsStrongPassword } from 'class-validator';

export class UserSignUpDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minUppercase: 0,
    minLength: 3,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
