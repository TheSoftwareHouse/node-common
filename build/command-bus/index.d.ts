export interface Handler {
    supports: (command: any) => boolean;
    execute: (command: any) => Promise<any>;
}
export declare class CommandBus {
    private handlers;
    constructor(handlers: Handler[]);
    execute(command: any): Promise<any>;
}
