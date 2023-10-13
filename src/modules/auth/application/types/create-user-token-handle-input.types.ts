import { UUID } from 'crypto';

export type CreateUserTokenHandlerInput = {
  userId: UUID;
  firstName: string;
  applicationId: UUID;
};
