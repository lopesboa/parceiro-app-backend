import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateUserInputDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsUUID()
  @IsNotEmpty()
  applicationId: UUID;
  @IsBoolean()
  @IsNotEmpty()
  isCarOwner: boolean = false;
}
