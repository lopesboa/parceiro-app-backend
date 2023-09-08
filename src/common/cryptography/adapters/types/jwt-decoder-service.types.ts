export type JWTDecodeService<DecodedJwt = any> = {
  execute(token: string): DecodedJwt;
};
