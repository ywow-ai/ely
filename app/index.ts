import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { jwt } from "@elysiajs/jwt";

const port: number = 3000;
const session_expired: number = 3600;

new Elysia({ adapter: node() })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRETS ?? "RWX",
      exp: new Date(Date.now() + session_expired * 1000).getTime(),
    })
  )
  .get("/", () => ({ message: "service is running" }))
  .get("/data", () => [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 },
  ])
  .get("/data/:id", () => ({ id: 1, name: "Alice", age: 25 }))
  .post("/data/:id/save", () => ({ id: 1, name: "Alice", age: 25 }))
  .listen(port);
