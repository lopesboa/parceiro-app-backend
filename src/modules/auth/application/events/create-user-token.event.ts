import { UUID } from 'crypto';

export class CreateUserTokenEvent {
  constructor(
    public userId: UUID,
    public firstName: string,
  ) {}
}
