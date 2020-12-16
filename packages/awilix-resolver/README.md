# Awilix Resolver

[![npm version](https://badge.fury.io/js/%40tshio%2Fawilix-resolver.svg)](https://badge.fury.io/js/%40tshio%2Fawilix-resolver)


**Non-blocking Awilix Resolver library for Node.js.**

This is a 100% JavaScript library, with TypeScript definition, with the Promise API.

## Installing

```bash
$ npm install @tshio/awilix-resolver
```
or
```bash
yarn add @tshio/awilix-resolver
```

## Usage

```ts
// CommonJS
const { asArray } = require("@tshio/awilix-resolver");

// ES Module
import { asArray } from "@tshio/awilix-resolver";

import * as awilix from "awilix";

// SUBSCRIBERS_IMPORTS
import ExampleSubscriber from "example-subscriber";


export async function registerSubscribers(container: AwilixContainer) {
  container.register({
    eventSubscribers: asArray<any>([
      // SUBSCRIBERS_SETUP
      awilix.asClass(ExampleSubscriber).singleton(),
    ]),
  });

  return container;
}
```

## License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).

## About us:

<a href="https://tsh.io"><b>The Software House</b></a>

<img src="https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/assets/tsh.png" alt="tsh.png" width="150"  />  

