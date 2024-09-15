import fastify from "fastify";
import cookie from "@fastify/cookie"
import { User } from "./routes/user";
import { Session } from "./routes/session";
import { Snacks } from "./routes/snacks";

export const app = fastify()

app.register(cookie)

app.register(User, {
    prefix: 'user'
})

app.register(Session, {
    prefix: 'session'
})

app.register(Snacks, {
    prefix: 'snacks'
})
