import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInInputDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
