import { IsEmail, MinLength } from "class-validator"

export class CreateUserDto {
  @IsEmail()
  email:string

  @MinLength(7, {message: 'Password must be more then 7 symbols'})
  password:string
}
