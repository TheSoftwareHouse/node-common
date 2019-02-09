export interface Handler {
  supports: (command: any) => boolean;
  execute: (command: any) => Promise<any>;
}

export class CommandBus {
  constructor(private handlers: Handler[]) {}

  public execute(command: any) {
    const matchedHandler = this.handlers.find(handler => handler.supports(command));

    if (!matchedHandler) {
      return Promise.reject(`Command: ${command.type} is not supported.`);
    }

    return matchedHandler.execute(command);
  }
}
