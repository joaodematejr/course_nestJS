import { IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;
}
