import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2';
import { Inject, Injectable } from '@nestjs/common';

import {
  DecodeAdapter,
  EncryptAdapter,
  DecryptAdapter,
  HashComparer,
  Hash,
} from './types';

import { Logger } from '@/common/Logger/infrastructure/types';

@Injectable()
export class JWTAdapterImplementation
  implements DecodeAdapter, EncryptAdapter, DecryptAdapter, HashComparer, Hash
{
  constructor(@Inject('Logger') private readonly logger: Logger) {}
  decode<DecodeResponse = jwt.JwtPayload>(data: string): DecodeResponse {
    try {
      return jwt.decode(data, { complete: true }) as DecodeResponse;
    } catch (error) {
      this.logger.error({ error }, 'Error while trying to decoding token');
    }
  }

  encrypt(
    payload: string | object | Buffer,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions,
  ) {
    try {
      return jwt.sign(payload, secretOrPrivateKey, options);
    } catch (error) {
      this.logger.error({ error }, 'Error while trying to encrypt payload');
    }
  }

  decrypt(
    token: string,
    secretOrPublicKey: jwt.Secret,
    options?: jwt.VerifyOptions & {
      complete?: false;
    },
  ) {
    try {
      return jwt.verify(token, secretOrPublicKey, options);
    } catch (error) {
      this.logger.error({ error }, 'Error while trying to decrypt token');
    }
  }

  async hash(plaintext: string) {
    try {
      return await argon.hash(plaintext);
    } catch (error) {
      this.logger.error({ error }, 'Error while trying to hash plaintext');
    }
  }

  async compare(plaintext: string, digest: string) {
    try {
      return await argon.verify(digest, plaintext);
    } catch (error) {
      this.logger.error({ error }, 'Error while trying to compare plaintext');
    }
  }
}
