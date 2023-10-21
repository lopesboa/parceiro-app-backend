export type Connection<T = any> = {
  query(statement: string, params: any): Promise<T>;
  one(statement: string, params: any): Promise<T>;
  close(): Promise<void>;
};
