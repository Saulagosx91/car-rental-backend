import { IsInt, IsString, Max, Min, IsNumber } from "class-validator";

export class CreateCarDto {
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsNumber()
  price: number;

  @IsInt()
  @Min(1)
  @Max(20)
  passengers: number;

  @IsString()
  plate: string;

  @IsInt()
  brandId: number;

  @IsInt()
  transmissionId: number;

  @IsInt()
  motorizationId: number;
}