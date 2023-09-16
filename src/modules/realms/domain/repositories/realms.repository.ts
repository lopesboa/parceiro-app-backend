export type RealmsRepository = {
  save(realm): Promise<void>;
  update(realm): Promise<void>;
  get(realmId: string): Promise<any>;
  findOne(params): Promise<any>;
};
