declare module 'jaeger-client' {
  import { Tracer } from 'opentracing';

  type IJaegerConfig = {
    serviceName: string;
    sampler: { type: string; param: number };
    reporter: { logSpans: boolean; agentHost: string; agentPort: number };
  };

  type IJaegerOptions = {
    logger: any;
  };

  type IJaegerClient = { initTracer: (config: IJaegerConfig, options: IJaegerOptions) => Tracer };

  const jaegerClient: IJaegerClient;

  export = jaegerClient;
}
