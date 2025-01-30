import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";
import logixlysia from "logixlysia";

const port: number = 3000;

new Elysia({ adapter: node() })
  .use(
    logixlysia({
      config: {
        showStartupMessage: true,
        startupMessageFormat: "banner",
        timestamp: {
          translateTime: "yyyy-mm-dd HH:MM:ss",
        },
        ip: true,
        logFilePath: "./logs/runtime.log",
        customLogFormat:
          "{now} {level} {duration} {method} {pathname} {status} {message} {ip} {epoch}",
      },
    })
  )
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRETS ?? "RWX", exp: "1h" }))
  .use(swagger())
  .get("/", () => "Hello Node!")
  .listen(port);
