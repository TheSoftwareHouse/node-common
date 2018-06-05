const mockSpan = {
  finish: jest.fn(),
};

const mockTracer = {
  inject: jest.fn().mockImplementation((span, format, headers) => {
    headers['tracingId'] = 'someId';
  }),
  extract: jest.fn().mockImplementation(() => mockSpan),
  startSpan: jest.fn().mockImplementation(() => mockSpan),
};

const mockJaegerClient = {
  initTracer: jest.fn().mockImplementation(() => mockTracer),
};

jest.mock('jaeger-client', () => mockJaegerClient);

import { initTracer } from './tracer';

describe('Tracer', () => {
  beforeEach(() => {
    mockSpan.finish.mockReset();
  });

  it('inits tracer with default params', () => {
    const tracer = initTracer();

    expect(mockJaegerClient.initTracer).toHaveBeenCalledWith(
      {
        reporter: { agentHost: 'localhost', agentPort: 6832, logSpans: true },
        sampler: { param: 1, type: 'const' },
        serviceName: 'Unknown app',
      },
      { logger: undefined }
    );
  });

  it('inits tracer with custom params', () => {
    process.env['APP_NAME'] = 'App';
    process.env['TRACING_SERVICE_HOST'] = 'host';
    process.env['TRACING_SERVICE_PORT'] = 1234;

    const logger = { some: 'logger' };
    const tracer = initTracer(logger);

    expect(mockJaegerClient.initTracer).toHaveBeenCalledWith(
      {
        reporter: { agentHost: 'host', agentPort: 1234, logSpans: true },
        sampler: { param: 1, type: 'const' },
        serviceName: 'App',
      },
      { logger: { some: 'logger' } }
    );
  });

  it('traces call', async () => {
    const tracer = initTracer();
    const call = jest.fn();

    await tracer.traceCall('callName', span => {
      call();
    });

    expect(mockTracer.startSpan).toBeCalledWith('callName', {});
    expect(call).toBeCalled();
    expect(mockSpan.finish).toBeCalled();
  });

  it('traces call with parent span and tags', async () => {
    const tracer = initTracer();
    const call = jest.fn();

    await tracer.traceCall(
      'firstCall',
      async firstSpan => {
        await tracer.traceCall(
          'secondCall',
          secondSpan => {
            call();
          },
          { other: 'tag' },
          firstSpan
        );
      },
      { some: 'tag' }
    );

    expect(mockTracer.startSpan).toBeCalledWith('firstCall', {
      tags: { some: 'tag' },
    });
    expect(mockTracer.startSpan).toBeCalledWith('secondCall', {
      tags: { other: 'tag' },
      childOf: mockSpan,
    });
    expect(call).toBeCalled();
    expect(mockSpan.finish.mock.calls.length).toEqual(2);
  });

  it('converts span to tracing id', () => {
    const tracer = initTracer();

    const tracingId = tracer.tracingIdToString(mockSpan);

    expect(mockTracer.inject).toHaveBeenCalledWith(mockSpan, 'http_headers', { tracingId: 'someId' });
    expect(tracingId).toEqual('{"tracingId":"someId"}');
  });

  it('converts tracing id to span', () => {
    const tracer = initTracer();

    const span = tracer.tracingIdFromString('{"tracingId":"someId"}');

    expect(mockTracer.extract).toHaveBeenCalledWith('http_headers', { tracingId: 'someId' });
    expect(span).toEqual(mockSpan);
  });
});
