import { IsUUID, IsNotEmpty } from 'class-validator';
import { UUID } from 'crypto';

export class ListUserInfoInputDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: UUID;
  @IsUUID()
  @IsNotEmpty()
  applicationId: UUID;
}

export class ListUserInfoResponse {
  userId: UUID;
  email: string;
  firstName: string;
  lastName: string;
  lastAccess: Date;
  isVerified: boolean;
  applicationId: UUID;
  birthDate: Date;
  gender: string;
  phone: string;
  thumb: string;
}
