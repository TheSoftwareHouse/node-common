import { initTracer as initJaegerClientTracer } from 'jaeger-client';
import { FORMAT_HTTP_HEADERS, Span, SpanContext, Tracer } from 'opentracing';
import { Logger } from '../logger/logger.types';

export interface TracingId {
  [key: string]: string;
}

export interface TraceTags {
  [key: string]: any;
}

export class CallTracer {
  constructor(private tracer: Tracer) {}

  public async traceCall(name: string, call: (span: Span) => void, tags?: TraceTags, childOf?: Span | SpanContext) {
    const span = this.tracer.startSpan(name, { childOf, tags });

    await call(span);

    span.finish();
  }

  public tracingIdToString(span: Span): string {
    const headers = {};

    this.tracer.inject(span, FORMAT_HTTP_HEADERS, headers);

    return JSON.stringify(headers);
  }

  public tracingIdFromString(tracingIdString: string): SpanContext | undefined {
    return this.tracer.extract(FORMAT_HTTP_HEADERS, JSON.parse(tracingIdString)) || undefined;
  }
}

export const initTracer = (logger?: Logger): CallTracer =>
  new CallTracer(
    initJaegerClientTracer(
      {
        serviceName: process.env.APP_NAME || 'Unknown app',
        sampler: {
          type: 'const',
          param: 1,
        },
        reporter: {
          logSpans: true,
          agentHost: process.env.TRACING_SERVICE_HOST || 'localhost',
          agentPort: Number(process.env.TRACING_SERVICE_PORT) || 6832,
        },
      },
      { logger }
    )
  );
