import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRealmInputDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
