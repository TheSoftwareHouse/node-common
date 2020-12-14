# Command Bus

[![npm version](https://badge.fury.io/js/%40tshio%2Fcommand-bus.svg)](https://badge.fury.io/js/%40tshio%2Fcommand-bus)


**Non-blocking Command Bus library for Node.js.**

This is a 100% JavaScript library, with TypeScript definition, with the Promise API.

## Installing

```bash
$ npm install @tshio/command-bus
```
or
```bash
yarn add @tshio/command-bus
```

## Usage

```ts
// CommonJS
const { Command, CommandBus, CommandHandler } = require('@tshio/command-bus');

// ES Module
import { Command, CommandBus, CommandHandler } from '@tshio/command-bus';


class TestHandler implements CommandHandler<Command<string>> {
  public commandType: string = "test-type";

  async execute(command: Command<string>) {
    return `handler-message ${command.payload}`;
  }
}


const bus = new CommandBus([new TestHandler()]);

const testCommand: Command<string> = {
  payload: "payload-data",
  type: "test-type",
};

const result = await bus.execute(testCommand);

console.log(result);

// => "handler-message payload-data"
```

## License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).

## About us:

<a href="https://tsh.io"><b>The Software House</b></a>

<img src="https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/assets/tsh.png" alt="tsh.png" width="150"  />  

