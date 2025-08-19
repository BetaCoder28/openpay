import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FormDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example : 'David'})
    name : string
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example : 'david@david.com'})
    email : string
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({example : 'este es un mensaje para david: te quiero mucho'})
    message: string
}