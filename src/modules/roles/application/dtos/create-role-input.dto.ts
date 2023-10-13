import { UUID } from 'crypto';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ALL_PERMISSIONS, AllPermissions } from '@/common/config';

export class CreateRoleInputDTO {
  @IsNotEmpty()
  @IsUUID()
  applicationId: UUID;
  @IsNotEmpty()
  @IsString()
  roleName: string;
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsEnum(ALL_PERMISSIONS, { each: true })
  permissions: AllPermissions;
}
