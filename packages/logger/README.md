# Logger

[![npm version](https://badge.fury.io/js/%40tshio%2Flogger.svg)](https://badge.fury.io/js/%40tshio%2Flogger)


**Logger library for Node.js.**

This is a 100% JavaScript library, with TypeScript definition, with the Promise API.

## Installing

```bash
$ npm install @tshio/logger
```
or
```bash
yarn add @tshio/logger
```

## Usage

```ts
// CommonJS
const { createLogger } = require('@tshio/logger');

// ES Module
import { createLogger } from '@tshio/logger';

const logger = createLogger();
const obfuscateLogger = createLogger(["secure"]);

const objectToLog = {
  key1: "value",
  secure: "secure data" // hide data
}


obfuscateLogger.info(objectToLog);

logger.info("Example info");
somePromise.catch((e) => logger.debug("Some error", e));
```

## License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).

## About us:

<a href="https://tsh.io"><b>The Software House</b></a>

<img src="https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/assets/tsh.png" alt="tsh.png" width="150"  />  

