import { JwtPayload, Secret, VerifyOptions } from 'jsonwebtoken';

export type DecryptAdapter = {
  decrypt(
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions & {
      complete?: false;
    },
  ): string | JwtPayload;
};
