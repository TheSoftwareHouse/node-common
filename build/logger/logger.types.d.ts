export declare type ILogMethod = (level: string, msg: string) => ILogger;
export declare type ILeveledLogMethod = (msg: string) => ILogger;
export interface ILogger {
    log: ILogMethod;
    error: ILeveledLogMethod;
    warn: ILeveledLogMethod;
    info: ILeveledLogMethod;
    verbose: ILeveledLogMethod;
    debug: ILeveledLogMethod;
}
