import { Test, TestingModule } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { Logger } from '@/modules/Logger/infrastructure/types';
import { JWTAdapterImplementation } from '../jwt.adapter';

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('JWTAdapterImplementation', () => {
  let jwtAdapter: JWTAdapterImplementation;
  let mockLogger: Logger;

  beforeEach(async () => {
    mockLogger = {
      error: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JWTAdapterImplementation,
        {
          provide: 'Logger',
          useValue: mockLogger,
        },
      ],
    }).compile();

    jwtAdapter = module.get<JWTAdapterImplementation>(JWTAdapterImplementation);
  });

  it('should be defined', () => {
    expect(jwtAdapter).toBeDefined();
  });

  describe('decode', () => {
    it('should handle decoding errors', () => {
      const invalidToken = 'invalid_jwt_token_here';
      const decoded = jwtAdapter.decode(invalidToken);
      expect(decoded).toBeUndefined();
    });

    it('should decode a valid token', async () => {
      const token = 'valid-token';

      const decodedToken = { sub: 'user123' };
      (jwt.decode as jest.Mock).mockReturnValue(decodedToken);

      const result = await jwtAdapter.decode(token);
      expect(result).toEqual(decodedToken);
    });

    it('should log an error for an invalid token', async () => {
      const invalidToken = 'invalid-token';

      (jwt.decode as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      await jwtAdapter.decode(invalidToken);

      expect(mockLogger.error).toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        { error: new Error() },
        'Error while trying to decoding token',
      );
    });
  });

  describe('encrypt', () => {
    it('should encrypt a payload', () => {
      const encryptedData = 'encrypted_data_here';
      const payload = {
        iss: 'iss',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 10,
      };

      const header = {
        alg: 'ES256',
        typ: 'JWT',
      };

      const secret = 'your_secret_key_here';

      (jwt.sign as jest.Mock).mockReturnValueOnce(encryptedData);
      const encrypted = jwtAdapter.encrypt(payload, secret, {
        algorithm: 'ES256',
        header,
      });
      expect(encrypted).toEqual(encryptedData);
    });

    it('should handle encryption errors', () => {
      const payload = { userId: 123 };
      const invalidSecret = 'invalid_secret_key_here';
      (jwt.sign as jest.Mock).mockReturnValueOnce(invalidSecret);
      const encrypted = jwtAdapter.encrypt(payload, invalidSecret);
      expect(encrypted).toEqual(invalidSecret);
    });

    it('should log an error if header has no alg', async () => {
      const payload = { userId: 123 };
      const secret = 'XXXXXXXXXXXXXXXXXXXX';
      const invalidHeader = {} as any;
      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      await jwtAdapter.encrypt(payload, secret, { header: invalidHeader });

      expect(mockLogger.error).toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        { error: new Error() },
        'Error while trying to encrypt payload',
      );
    });
  });

  describe('decrypt', () => {
    it('should verify valid token with righ signature', () => {
      const token = 'valid-token';
      const secret = 'XXXXXXXXXXXXXXXXXXXX';

      const decodedToken = { sub: 'user123' };
      (jwt.verify as jest.Mock).mockReturnValueOnce(decodedToken);

      const result = jwtAdapter.decrypt(token, secret);
      expect(result).toEqual({
        sub: 'user123',
      });
    });

    it('should return error if signature is invalid', () => {
      const token = 'invalid-token';
      const secret = 'XXXXXXXXXXXXXXXXXXXX';

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      jwtAdapter.decrypt(token, secret);
      expect(mockLogger.error).toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        { error: new Error() },
        'Error while trying to decrypt token',
      );
    });
  });
});
