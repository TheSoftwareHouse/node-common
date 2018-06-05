"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jaeger_client_1 = require("jaeger-client");
const opentracing_1 = require("opentracing");
class CallTracer {
    constructor(tracer) {
        this.tracer = tracer;
    }
    async traceCall(name, call, tags, childOf) {
        const span = this.tracer.startSpan(name, { childOf, tags });
        await call(span);
        span.finish();
    }
    tracingIdToString(span) {
        const headers = {};
        this.tracer.inject(span, opentracing_1.FORMAT_HTTP_HEADERS, headers);
        return JSON.stringify(headers);
    }
    tracingIdFromString(tracingIdString) {
        return this.tracer.extract(opentracing_1.FORMAT_HTTP_HEADERS, JSON.parse(tracingIdString)) || undefined;
    }
}
exports.CallTracer = CallTracer;
exports.initTracer = (logger) => new CallTracer(jaeger_client_1.initTracer({
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
}, { logger }));
