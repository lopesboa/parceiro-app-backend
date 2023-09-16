import { IsNotEmpty, IsNumber } from 'class-validator';

export class ListRealmInputDTO {
  @IsNumber()
  @IsNotEmpty()
  limit: number;
  @IsNumber()
  offset?: number;
}
