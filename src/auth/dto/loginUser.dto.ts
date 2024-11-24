import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly password: string;
}
