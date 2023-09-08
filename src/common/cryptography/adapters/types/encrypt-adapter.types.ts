import { Secret, SignOptions } from 'jsonwebtoken';

export type EncryptAdapter = {
  encrypt(
    payload: string | object | Buffer,
    secretOrPrivateKey: Secret,
    options?: SignOptions,
  ): string;
};
