import { Realms } from '../entities';

export type RealmsRepository = {
  save(realms: Realms): Promise<Realms>;
  update(realm: Realms): Promise<void>;
  findOne(realmId: string): Promise<Realms>;
  getAll(limit: number, offset: number): Promise<[Realms]>;
  delete(realmId: string): Promise<void>;
};
