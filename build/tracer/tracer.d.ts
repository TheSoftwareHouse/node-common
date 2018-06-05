import { Span, SpanContext, Tracer } from 'opentracing';
import { ILogger } from '../logger/logger.types';
export interface ITracingId {
    [key: string]: string;
}
export interface ITags {
    [key: string]: any;
}
export declare class CallTracer {
    private tracer;
    constructor(tracer: Tracer);
    traceCall(name: string, call: (span: Span) => void, tags?: ITags, childOf?: Span | SpanContext): Promise<void>;
    tracingIdToString(span: Span): string;
    tracingIdFromString(tracingIdString: string): SpanContext | undefined;
}
export declare const initTracer: (logger?: ILogger | undefined) => CallTracer;
