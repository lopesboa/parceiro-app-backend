import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerModule } from '../logger.module';

import { AppLoggerAdapter } from '../infrastructure/adapters';

describe('LoggerModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        PinoLoggerModule.forRoot({
          pinoHttp: {},
        }),
        LoggerModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    const appLoggerAdapter = app.get<AppLoggerAdapter>(AppLoggerAdapter);
    expect(appLoggerAdapter).toBeDefined();
  });

  it('should provide AppLoggerAdapter as Logger', () => {
    const appLoggerAdapter = app.get<AppLoggerAdapter>(AppLoggerAdapter);
    expect(appLoggerAdapter).toBeInstanceOf(AppLoggerAdapter);
  });

  describe('in development environment', () => {
    let pinoLoggerModuleSpy: jest.SpyInstance;

    beforeEach(async () => {
      process.env.NODE_ENV = 'development';
      pinoLoggerModuleSpy = jest.spyOn(PinoLoggerModule, 'forRoot');

      app = await Test.createTestingModule({
        imports: [
          PinoLoggerModule.forRoot({
            pinoHttp: {
              transport:
                process.env.NODE_ENV === 'development'
                  ? { target: 'pino-pretty' }
                  : undefined,
            },
          }),
          LoggerModule,
        ],
      }).compile();
    });

    it('should call PinoLoggerModule.forRoot() with transport.target set to "pino-pretty" in development environment', () => {
      process.env.NODE_ENV = 'production';
      expect(pinoLoggerModuleSpy).toHaveBeenCalledWith({
        pinoHttp: {
          transport: { target: 'pino-pretty' },
        },
      });
    });
  });

  describe('in production environment', () => {
    let pinoLoggerModuleSpy: jest.SpyInstance;

    beforeEach(async () => {
      pinoLoggerModuleSpy = jest.spyOn(PinoLoggerModule, 'forRoot');

      app = await Test.createTestingModule({
        imports: [
          PinoLoggerModule.forRoot({
            pinoHttp: {
              transport:
                process.env.NODE_ENV === 'development'
                  ? { target: 'pino-pretty' }
                  : undefined,
            },
          }),
          LoggerModule,
        ],
      }).compile();
    });

    it('should call PinoLoggerModule.forRoot() with transport.target set to undefined in production environment', () => {
      expect(pinoLoggerModuleSpy).toHaveBeenCalledWith({
        pinoHttp: {
          transport: undefined,
        },
      });
    });
  });
});
