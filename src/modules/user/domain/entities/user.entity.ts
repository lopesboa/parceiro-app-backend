export class UserEntity {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  applicationId: string;
  tokenId?: string;
  isVerified?: boolean;
  lastAccess?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
