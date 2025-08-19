import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;

  @IsNumber()
  @ApiProperty({ example: 1 })
  planId: number;

  @IsString()
  @ApiProperty({ example: 'tok234567890abcd' })
  cardToken: string;

  @IsString()
  @ApiProperty({ example: 'sesion123456789' })
  deviceSessionId: string;
}