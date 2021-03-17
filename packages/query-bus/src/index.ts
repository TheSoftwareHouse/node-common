export interface Query<T> {
  type: string;
  payload: T;
}

export interface QueryResult<T> {
  result: T;
}

export interface QueryHandler<TQuery extends Query<unknown>, TResult extends QueryResult<unknown>> {
  queryType: string;
  execute: (query: TQuery) => Promise<TResult>;
}

type ResultForQuery<TRegisteredQueryHandlers extends QueryHandler<any, any>[], TQuery extends Query<any>> = Promise<
  ReturnType<Extract<TRegisteredQueryHandlers[number], { execute: (cmd: TQuery) => any }>["execute"]>
>;

export class QueryBus<TRegisteredQueryHandlers extends QueryHandler<any, any>[]> {
  private availableHandlers: Record<string, TRegisteredQueryHandlers[number]>;

  constructor(queryHandlers: TRegisteredQueryHandlers) {
    this.availableHandlers = {};

    queryHandlers.forEach((queryHandler) => {
      this.availableHandlers[queryHandler.queryType] = queryHandler;
    }, this);
  }

  public execute<TQuery extends Query<any>>(query: TQuery): ResultForQuery<TRegisteredQueryHandlers, TQuery> {
    if (!this.availableHandlers[query.type]) {
      return Promise.reject(new Error(`Query: ${query.type} is not supported.`));
    }

    return this.availableHandlers[query.type].execute(query);
  }
}
