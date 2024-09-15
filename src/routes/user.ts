import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import bcrypt from "bcrypt"
import { randomUUID } from "crypto";

export async function User(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const requestSchema = z.object({
            name: z.string(),
            password: z.string(),
            email: z.string()
        })

        const { name, password, email } = requestSchema.parse(request.body)

        const userEmailAlreadyExists = await knex('users').select('*').where('user_email', email).first()

        console.log(userEmailAlreadyExists)

        if (userEmailAlreadyExists !== undefined) {
            return reply.status(200).send({
                message: 'User email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await knex('users').insert({
            user_id: randomUUID(),
            user_name: name,
            user_email: email,
            user_password: hashedPassword
        })
        
        return reply.status(201).send({})
    })
}