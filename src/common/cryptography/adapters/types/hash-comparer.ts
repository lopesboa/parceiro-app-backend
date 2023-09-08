export type HashComparer = {
  compare: (plaitext: string, digest: string) => Promise<boolean>;
};
