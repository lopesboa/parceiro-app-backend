import { Global, Module } from '@nestjs/common';

import { PinoLogger, LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { AppLoggerAdapter } from './infrastructure/adapters';

const date = new Date(Date.now()).toLocaleString('pt-BR');

const pinoHttp = {
  name: process.env.APP_NAME,
  level: 'info',
  transport:
    process.env.NODE_ENV === 'development'
      ? { target: 'pino-pretty' }
      : undefined,
  redact: {
    paths: [
      'req.headers.authorization',
      'userId',
      'userID',
      'email',
      'cookie',
      'req.headers.cookie',
      'signedPayload',
    ],
    censor: '[Sanar Redacted]',
  },
  timestamp: () => `,"time":"${date}"`,
  genReqId: (req) => req.headers['x-request-id'],
};

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp,
    }),
  ],
  providers: [
    {
      provide: 'Logger',
      useExisting: PinoLogger,
    },
    AppLoggerAdapter,
  ],
  exports: [
    AppLoggerAdapter,
    { provide: 'Logger', useClass: AppLoggerAdapter },
  ],
})
export class LoggerModule {}
