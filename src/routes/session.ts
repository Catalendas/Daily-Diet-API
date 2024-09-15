import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import bcrypt from "bcrypt"
import { randomUUID } from "crypto";

export async function Session(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const requestSchema = z.object({
            password: z.string(),
            email: z.string()
        })

        const { password, email } = requestSchema.parse(request.body)

        const user = await knex('users').select('*').where({
            user_email: email,
        })

        const matchPassword = await bcrypt.compare(password, user[0].user_password)

        if (!matchPassword) {
            return reply.status(401).send({
                message: 'User not found'
            })
        }

        const sessionId = await randomUUID()

        reply.setCookie('sessionId', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

        reply.setCookie('userId', user[0].user_id, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

        return reply.status(201).send({
            user
        })
    }) 
}