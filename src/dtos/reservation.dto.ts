import { IsDateString, IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  return_date: string;

  @IsOptional()
  @IsString()
  status?: 'SOLICITED' | 'CANCELLED' | 'COMPLETED';

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsOptional()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  carId: number;
}