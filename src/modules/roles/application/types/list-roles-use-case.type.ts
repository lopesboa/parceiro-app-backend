export type ListRolesUseCase = {
  execute(limit: number, offset: number): Promise<void>;
};
