import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class AddRoleToUserInputDTO {
  @IsNotEmpty()
  @IsUUID()
  userId: UUID;
  @IsUUID()
  @IsNotEmpty()
  roleId: UUID;
  @IsUUID()
  @IsNotEmpty()
  applicationId: UUID;
}
