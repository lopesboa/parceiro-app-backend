import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Logger } from '../types';

@Injectable()
export class AppLoggerAdapter implements LoggerService {
  constructor(@Inject('Logger') private readonly logger: Logger) {}
  log(message: any, ...optionalParams: any[]) {
    this.logger.info(optionalParams, message);
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(optionalParams, message);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(optionalParams, message);
  }
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(optionalParams, message);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.trace(optionalParams, message);
  }
}
