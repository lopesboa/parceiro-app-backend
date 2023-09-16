import { Realms } from '../entities';

export type RealmsRepository = {
  save(realms: Realms): Promise<void>;
  update(realm: Realms): Promise<void>;
  findOne(realmId: string): Promise<Realms>;
  delete(realmId: string): Promise<void>;
};
