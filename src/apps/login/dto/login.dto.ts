import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({example: 'david@david.com'})
  email : string
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'david123'})
  password : string
}
