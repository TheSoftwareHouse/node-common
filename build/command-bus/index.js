"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandBus {
    constructor(handlers) {
        this.handlers = handlers;
    }
    execute(command) {
        const matchedHandler = this.handlers.find(handler => handler.supports(command));
        if (!matchedHandler) {
            return Promise.reject(`Command: ${command.type} is not supported.`);
        }
        return matchedHandler.execute(command);
    }
}
exports.CommandBus = CommandBus;
