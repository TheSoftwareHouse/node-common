import { Span, SpanContext, Tracer } from 'opentracing';
import { Logger } from '../logger/logger.types';
export interface TracingId {
    [key: string]: string;
}
export interface TraceTags {
    [key: string]: any;
}
export declare class CallTracer {
    private tracer;
    constructor(tracer: Tracer);
    traceCall(name: string, call: (span: Span) => void, tags?: TraceTags, childOf?: Span | SpanContext): Promise<void>;
    tracingIdToString(span: Span): string;
    tracingIdFromString(tracingIdString: string): SpanContext | undefined;
}
export declare const initTracer: (logger?: Logger | undefined) => CallTracer;
