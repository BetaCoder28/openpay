import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  @ApiProperty({ example: 'David' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsEmail()
  @ApiProperty({ example: 'david@david.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'david123' })
  password: string;

  @IsString()
  @ApiProperty({example: 'cus_1234567890', required: false})
  openpayId? : string;

}
