import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusAfterRetry {
  UNPAID = 'unpaid',
  CANCELLED = 'cancelled'
}


export class PlanDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Plan Prueba' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 1500.0 })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'MXN' })
  currency: string; // por defecto es MXN

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 1 })
  repeat_every: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "month" })
  repeat_unit: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 1 })
  retry_times: number;
  
  @IsEnum(StatusAfterRetry)
  @ApiProperty({ enum: StatusAfterRetry, example: StatusAfterRetry.UNPAID })
  status_after_retry: StatusAfterRetry;//unpaid or canceled
  
  
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ example: 0 })
  trial_days: number

}
