import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetDto {
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;

  @IsJWT()
  token: string;
}
