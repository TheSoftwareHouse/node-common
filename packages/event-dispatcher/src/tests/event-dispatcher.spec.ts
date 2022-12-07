import { deepEqual, fail } from "assert";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import "mocha";
import { Event, EventDispatcher, EventSubscriberInterface } from "..";

use(chaiAsPromised);

type SpiedFn<T extends Function> = T & { calledWith: any };

type SpiedObject<T extends object> = { [K in keyof T]: T[K] extends Function ? SpiedFn<T[K]> : T[K] };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const logger = console as any;

type StubSubscriber = EventSubscriberInterface & {
  logEmail(event: Event): Promise<void>;
  sendEmail(event: Event): Promise<void>;
};

const stubSubscriber = {
  getSubscribedEvents() {
    return [
      { name: "userCreated", method: "sendEmail" },
      { name: "testEvent", method: "logEmail" },
    ];
  },

  async logEmail(event: Event) {
    stubSubscriber.logEmail.calledWith = event;
  },

  async sendEmail(event: Event) {
    stubSubscriber.sendEmail.calledWith = event;
  },
} as unknown as SpiedObject<StubSubscriber>;

describe("event dispatcher", () => {
  it("it support event subscribers", async () => {
    const dispatcher = new EventDispatcher(logger);
    dispatcher.addSubscriber(stubSubscriber);

    const testEvent = { name: "testEvent", payload: { foo: 1, bar: 2, baz: 3 } };
    const userCreatedEvent = { name: "userCreated", payload: { userId: 1 } };

    await dispatcher.dispatch(testEvent);
    await dispatcher.dispatch(userCreatedEvent);

    deepEqual(stubSubscriber.logEmail.calledWith, testEvent);
    deepEqual(stubSubscriber.sendEmail.calledWith, userCreatedEvent);
  });

  it("it support inline event subscribers", async () => {
    const dispatcher = new EventDispatcher(logger);

    const stubEvent = {
      name: "test",
      payload: {
        foo: 1,
        bar: 2,
        baz: 3,
      },
    };

    dispatcher.subscribe("test", async (event) => {
      deepEqual(event, stubEvent);
    });

    dispatcher.subscribe("test2", async () => {
      fail("event was not fired");
    });

    await dispatcher.dispatch(stubEvent);
  });

  it("it support async operations", (done) => {
    const dispatcher = new EventDispatcher(logger);

    const stubEvent = {
      name: "testAsync",
      payload: {
        foo: 1,
        bar: 2,
        baz: 3,
      },
    };

    dispatcher.subscribe("testAsync", async (event) => {
      await delay(10);
      deepEqual(event, stubEvent);
      done();
    });

    dispatcher.dispatch(stubEvent);
  });

  it("Error thrown by a Subscriber should not block the execution of any further Subscriber", (done) => {
    const dispatcher = new EventDispatcher(logger);

    dispatcher.addSubscriber(stubSubscriber);

    dispatcher.subscribe("test", async () => {
      await delay(10);
      throw new Error("SomethingBadHappend");
    });

    dispatcher.subscribe("test", async () => {
      await delay(20);
      logger.debug("Event handled");
    });

    dispatcher
      .dispatch({
        name: "test",
        payload: { foo: 1 },
      })
      .finally(() => done());
  });

  it("Error thrown by a Subscriber shouldn't be caught when throwOnFailure flag is set to true", (done) => {
    const dispatcher = new EventDispatcher(logger, [], true);

    dispatcher.addSubscriber(stubSubscriber);

    dispatcher.subscribe("test", async () => {
      await delay(10);
      throw new Error("SomethingBadHappend");
    });

    dispatcher
      .dispatch({
        name: "test",
        payload: { foo: 1 },
      })
      .catch(() => {
        done();
      });
  });
});
