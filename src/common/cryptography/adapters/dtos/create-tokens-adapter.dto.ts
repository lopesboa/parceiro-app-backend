import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class GetTokensInputDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: UUID;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsArray({ each: true })
  permissions: string[];
  applicationId: UUID;
}

export class RefreshTokenInputDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: UUID;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsArray({ each: true })
  permissions: string[];
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
  @IsNotEmpty()
  @IsString()
  tokenToRefresh: string;
  applicationId: UUID;
}

export class CreateHashedTokensInputDTO {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}

export class TokensResponseDTO {
  accessToken: string;
  refreshToken: string;
}
