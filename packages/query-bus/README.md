# Query Bus

[![npm version](https://badge.fury.io/js/%40tshio%2Fquery-bus.svg)](https://badge.fury.io/js/%40tshio%2Fquery-bus)


**Non-blocking Query Bus library for Node.js.**

This is a 100% JavaScript library, with TypeScript definition, with the Promise API.

## Installing

```bash
$ npm install @tshio/query-bus
```
or
```bash
yarn add @tshio/query-bus
```

## Usage

```ts
// CommonJS
const { Query, QueryBus, QueryHandler, QueryResult } = require('@tshio/query-bus');

// ES Module
import { Query, QueryBus, QueryHandler, QueryResult } from '@tshio/query-bus';


const QUERY_TYPE = "query-type";

class TestQueryResult implements QueryResult<string> {
  result: string;

  constructor(payload: string) {
    this.result = payload;
  }
}
class TestQueryHandler implements QueryHandler<Query<string>, QueryResult<string>> {
  public queryType: string = QUERY_TYPE;

  public execute(query: Query<string>): Promise<QueryResult<string>> {
    return Promise.resolve(new TestQueryResult(query.payload));
  }
}

const bus = new QueryBus([new TestQueryHandler()]);

const query: Query<string> = {
  payload: "test",
  type: "query-type",
};

bus.execute(query).then((result) => {
  console.log(result);

  // => "{ result: "test" }";
});
```

## License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).

## About us:

<a href="https://tsh.io"><b>The Software House</b></a>

<img src="https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/assets/tsh.png" alt="tsh.png" width="150"  />  

