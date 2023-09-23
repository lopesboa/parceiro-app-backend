import { UUID } from 'crypto';

export class LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export class ValidateUserDTO {
  userId: UUID;
  firstName: string;
  lastName: string;
  email: string;
  applicationId: string;
  tokenId: string;
}
