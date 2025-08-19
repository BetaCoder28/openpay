import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Plan Prueba' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 1500.00 })
  amount: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 15 })
  baseTime: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 30 })
  durationDays: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 3 })
  numberPeople: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true })
  isActive: boolean;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 5 })
  refreshTime: number;

  // campos requeridos por openpay
  @IsInt()
  @Min(1)
  @Max(9)
  @ApiProperty({ example: 3 })
  retryTimes: number;

  @IsString()
  @IsEnum(['unpaid', 'cancelled'])
  @ApiProperty({ example: 'unpaid' })
  statusAfterRetry: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ example: 0 })
  trialDays: number;
  
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1 })
  repeatEvery: number
  
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 'month' })
  repeatUnit : string

}
