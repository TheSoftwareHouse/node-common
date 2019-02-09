declare module 'jaeger-client' {
  import { Tracer } from 'opentracing';

  type JaegerConfig = {
    serviceName: string;
    sampler: { type: string; param: number };
    reporter: { logSpans: boolean; agentHost: string; agentPort: number };
  };

  type JaegerOptions = {
    logger: any;
  };

  type JaegerClient = { initTracer: (config: JaegerConfig, options: JaegerOptions) => Tracer };

  const jaegerClient: JaegerClient;

  export = jaegerClient;
}
