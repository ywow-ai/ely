import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";

const port: number = 3000;

new Elysia({ adapter: node() })
  .use(
    jwt({ name: "jwt", secret: process.env.JWT_SECRETS ?? "RWX", exp: "1h" })
  )
  .use(swagger())
  .get("/", () => "Hello Node!")
  .listen(port);
