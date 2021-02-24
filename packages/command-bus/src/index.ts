import { CommandNotSupportedError } from "./errors/command-not-supported.error";

export interface Command<T> {
  type: string;
  payload: T;
}

export interface CommandHandler<T extends Command<any> = Command<any>> {
  commandType: string;
  execute: (command: T) => Promise<any>;
}

interface CommandHandlers {
  [key: string]: CommandHandler;
}

export class CommandBus {
  private availableHandlers: CommandHandlers;

  constructor(commandHandlers: CommandHandler[]) {
    this.availableHandlers = {};

    commandHandlers.forEach((commandHandler) => {
      this.availableHandlers[commandHandler.commandType] = commandHandler;
    }, this);
  }

  public execute(command: any) {
    if (!this.availableHandlers[command.type]) {
      return Promise.reject(new CommandNotSupportedError(`Command: ${command.type} is not supported.`));
    }

    return this.availableHandlers[command.type].execute(command);
  }
}
