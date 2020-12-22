import "mocha";
import { createLogger } from "..";

describe("logger", () => {
  it("Check logger format", async () => {
    const winstonLogger = createLogger(process.env, ["secure"]);

    class Circular {
      constructor() {
        this.secure = "secure data";
        this.self = this;
      }

      private self: Circular;

      private secure: string;
    }

    const circularObject = new Circular();

    winstonLogger.info(circularObject);
  });
});
