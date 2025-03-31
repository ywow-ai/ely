import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";

const port: number = 3000;
const data = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 }
];

new Elysia({ adapter: node() })
  .use(
    jwt({ name: "jwt", secret: process.env.JWT_SECRETS ?? "RWX", exp: "1h" })
  )
  .use(swagger())
  .get("/", () => "Hello Node!")
  .get("/data", () => data)
  .listen(port);
