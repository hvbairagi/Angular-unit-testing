import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  it('should log the message', () => {
    spyOn(console, 'log');
    const message = 'angular unit testing';
    const logger = new LoggerService();
    logger.log(message);
    // assertion
    expect(console.log)
      .withContext('should have been called only once')
      .toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(`LOGGER LOG:${message}`);
  });
});
