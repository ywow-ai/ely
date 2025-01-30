import { Elysia } from "elysia";
import { node } from "@elysiajs/node";

new Elysia({ adapter: node() }).get("/", () => "Hello Node!").listen(3000);
