import { UUID } from 'crypto';

export type CreateRolesUseCase = {
  execute(applicationId: UUID): Promise<void>;
};
