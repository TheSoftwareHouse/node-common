import { CommandNotSupportedError } from "./errors/command-not-supported.error";

export interface Command<T> {
  type: string;
  payload: T;
}

export interface CommandHandler<T extends Command<any> = Command<any>> {
  commandType: string;
  execute: (command: T) => Promise<any>;
}

type ResultForCommand<TRegisteredCommandHandlers extends CommandHandler[], TCommand extends Command<any>> = Promise<
  ReturnType<Extract<TRegisteredCommandHandlers[number], { execute: (cmd: TCommand) => any }>["execute"]>
>;

export class CommandBus<TRegisteredCommandHandlers extends CommandHandler[] = CommandHandler<any>[]> {
  private readonly availableHandlers: Record<string, TRegisteredCommandHandlers[number]>;

  constructor(commandHandlers: TRegisteredCommandHandlers) {
    this.availableHandlers = {};

    commandHandlers.forEach((commandHandler) => {
      this.availableHandlers[commandHandler.commandType] = commandHandler;
    }, this);
  }

  public execute<TCommand extends Command<any> = any>(
    command: TCommand,
  ): ResultForCommand<TRegisteredCommandHandlers, TCommand> {
    if (!this.availableHandlers[command.type]) {
      return Promise.reject(new CommandNotSupportedError(`Command: ${command.type} is not supported.`));
    }

    return this.availableHandlers[command.type].execute(command);
  }
}

export { CommandNotSupportedError };
