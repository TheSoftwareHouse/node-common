# Event Dispatcher

[![npm version](https://badge.fury.io/js/%40tshio%2Fevent-dispatcher.svg)](https://badge.fury.io/js/%40tshio%2Fevent-dispatcher)


**Non-blocking Event Dispatcher library for Node.js.**

This is a 100% JavaScript library, with TypeScript definition, with the Promise API.

## Installing

```bash
$ npm install @tshio/event-dispatcher
```
or
```bash
yarn add @tshio/event-dispatcher
```

## Usage

```ts
// CommonJS
const { Event, EventDispatcher, EventSubscriberInterface }  = require('@tshio/event-dispatcher');

// ES Module
import { Event, EventDispatcher, EventSubscriberInterface }  from '@tshio/event-dispatcher';

const dispatcher = new EventDispatcher(console);

const stubEvent = {
  name: "test",
  payload: {
    foo: 1,
    bar: 2,
    baz: 3,
  },
};

dispatcher.subscribe("test", (event) => {
  console.log(event);
  
  // => "{ 
  //       name: "test",
  //       payload: {
  //       foo: 1,
  //       bar: 2,
  //       baz: 3,
  //     }
});

dispatcher.dispatch(stubEvent);
```

## License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).

## About us:

<a href="https://tsh.io"><b>The Software House</b></a>

<img src="https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/assets/tsh.png" alt="tsh.png" width="150"  />  

