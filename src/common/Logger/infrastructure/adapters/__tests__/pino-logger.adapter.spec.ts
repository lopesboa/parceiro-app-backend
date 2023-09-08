import { Test, TestingModule } from '@nestjs/testing';
import { AppLoggerAdapter } from '../pino-logger.adapter';
import { Logger } from '../../types';

describe('AppLoggerAdapter', () => {
  let appLoggerAdapter: AppLoggerAdapter;
  let logger: Logger;

  beforeEach(async () => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      trace: jest.fn(),
      fatal: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [AppLoggerAdapter, { provide: 'Logger', useValue: logger }],
    }).compile();

    appLoggerAdapter = module.get<AppLoggerAdapter>(AppLoggerAdapter);
  });

  it('should be defined', () => {
    expect(appLoggerAdapter).toBeDefined();
  });

  it('should call logger.info with message and optionalParams in log method', () => {
    const message = 'This is a log message';
    const optionalParams = [1, 2, 3];

    appLoggerAdapter.log(message, ...optionalParams);

    expect(logger.info).toHaveBeenCalledWith(optionalParams, message);
  });

  it('should call logger.error with message and optionalParams in error method', () => {
    const message = 'This is an error message';
    const optionalParams = { key: 'value' };

    appLoggerAdapter.error(message, optionalParams);

    expect(logger.error).toHaveBeenCalledWith([optionalParams], message);
  });

  it('should not call logger.debug in log method when debug is not implemented', () => {
    const message = 'This is a debug message';

    appLoggerAdapter.log(message);

    expect(logger.debug).not.toHaveBeenCalled();
  });

  it('should not call logger.trace in warn method when verbose is not implemented', () => {
    const message = 'This is a verbose message';

    appLoggerAdapter.warn(message);

    expect(logger.trace).not.toHaveBeenCalled();
  });

  it('should call logger.info with message and empty optionalParams when log method is called without optionalParams', () => {
    const message = 'This is a log message';

    appLoggerAdapter.log(message);

    expect(logger.info).toHaveBeenCalledWith([], message);
  });

  it('should call logger.error with message and empty optionalParams when error method is called without optionalParams', () => {
    const message = 'This is an error message';

    appLoggerAdapter.error(message);

    expect(logger.error).toHaveBeenCalledWith([], message);
  });

  it('should call logger.warn with message and empty optionalParams when warn method is called without optionalParams', () => {
    const message = 'This is a warning message';

    appLoggerAdapter.warn(message);

    expect(logger.warn).toHaveBeenCalledWith([], message);
  });

  it('should call logger.debug with message and empty optionalParams when debug method is called without optionalParams', () => {
    const message = 'This is a debug message';

    appLoggerAdapter.debug(message);

    expect(logger.debug).toHaveBeenCalledWith([], message);
  });

  it('should call logger.trace with message and empty optionalParams when verbose method is called without optionalParams', () => {
    const message = 'This is a verbose message';

    appLoggerAdapter.verbose(message);

    expect(logger.trace).toHaveBeenCalledWith([], message);
  });

  it('should handle log method call with null message and optionalParams', () => {
    appLoggerAdapter.log(null, 'optional');

    expect(logger.info).toHaveBeenCalledWith(['optional'], null);
  });

  it('should handle error method call with undefined message and optionalParams', () => {
    appLoggerAdapter.error(undefined, 'optional');

    expect(logger.error).toHaveBeenCalledWith(['optional'], undefined);
  });
});
