import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  MaxLength, 
  MinLength,
  IsBoolean,
  IsObject
} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ example: 'David' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'Garcia', required: false })
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({ example: 'david@david.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'david123' })
  password: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: '5512345678', required: false })
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'Calle Falsa', required: false })
  street?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({ example: '123', required: false })
  exteriorNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({ example: 'A', required: false })
  interiorNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'Colonia Centro', required: false })
  neighborhood?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'Ciudad de México', required: false })
  city?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'CDMX', required: false })
  state?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({ example: '12345', required: false })
  postalCode?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2)
  @ApiProperty({ example: 'MX', required: false })
  country?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'cus_1234567890', required: false })
  openpayId?: string;
}

// DTO para respuesta get de Usuario
export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'David' })
  name: string;

  @ApiProperty({ example: 'Garcia', required: false })
  lastName?: string;

  @ApiProperty({ example: 'david@david.com' })
  email: string;

  @ApiProperty({ example: '5512345678', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'cus_1234567890', required: false })
  openpayId?: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

// DTO para dirección
export class AddressDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'Calle Falsa', required: false })
  street?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({ example: '123', required: false })
  exteriorNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({ example: 'A', required: false })
  interiorNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'Colonia Centro', required: false })
  neighborhood?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'Ciudad de México', required: false })
  city?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'CDMX', required: false })
  state?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({ example: '12345', required: false })
  postalCode?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2)
  @ApiProperty({ example: 'MX', required: false })
  country?: string;
}


// DTO para creación en openpay
export class OpenPayCustomerDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'ext_123456', required: false })
  external_id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'David' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Garcia', required: false })
  last_name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'david@david.com' })
  email: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false, required: false })
  requires_account?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '5512345678', required: false })
  phone_number?: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ 
    example: {
      line1: 'Calle Falsa 123',
      line2: 'Interior A',
      line3: 'Colonia Centro',
      postal_code: '12345',
      city: 'Ciudad de México',
      state: 'CDMX',
      country_code: 'MX'
    }, 
    required: false 
  })
  address?: {
    line1: string;
    line2?: string;
    line3?: string;
    postal_code: string;
    city: string;
    state: string;
    country_code: string;
  };
}