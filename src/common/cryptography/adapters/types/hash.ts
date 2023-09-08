export type Hash = {
  hash: (plaintext: string) => Promise<string>;
};
