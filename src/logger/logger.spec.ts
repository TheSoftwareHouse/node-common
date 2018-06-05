import { winstonLogger } from './logger';
import * as winston from 'winston';

describe('Logger', () => {
  it('outputs properly formatted message to console', () => {
    Date.prototype.toISOString = jest.fn(() => 'mockedDate');
    process.env['APP_NAME'] = 'appName';
    process.env['NODE_ENV'] = 'nodeEnv';
    process.env['HOST'] = 'host';
    process.env['LOGGING_LEVEL'] = 'loggingLevel';

    expect(winstonLogger instanceof winston.Logger).toBe(true);
    expect(winstonLogger.transports['console'] instanceof winston.transports.Console).toBe(true);

    expect(
      winstonLogger.transports['console'].formatter.call(this, {
        message: 'someMessage',
        level: 'messageLevel',
      })
    ).toBe(
      JSON.stringify({
        '@timestamp': 'mockedDate',
        '@version': 1,
        application: 'appName',
        environment: 'nodeEnv',
        host: 'host',
        message: 'someMessage',
        severity: 'messageLevel',
        type: 'stdin',
      })
    );
  });
});
