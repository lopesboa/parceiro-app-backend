export type DecodeAdapter = {
  decode<DecodeResponse>(token: string): DecodeResponse;
};
