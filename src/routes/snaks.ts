import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { Auth } from "../middleware/auht";
import { randomUUID } from "crypto";

export async function Snaks(app: FastifyInstance) {
    app.post('/', {
        preHandler: [Auth]
    } ,async (request, reply) => {
        const requestSchema = z.object({
            snack_name: z.string(),
            snack_description: z.string(),
            insideOroutside: z.enum(['inside', 'outside']),
        })

        const { 
            snack_name, 
            snack_description, 
            insideOroutside 
        } = requestSchema.parse(request.body)

        const { userId } = request.cookies

        await knex('snacks')
            .insert({
                snack_id: randomUUID(),
                snack_name,
                snack_description,
                insideOroutside,
                user_id: userId
            })
            
        return reply.status(201).send()
    })

    app.get('/', {
        preHandler: [Auth]
    }, async (request, reply) => {
        const { userId } = request.cookies

        const snaks = await knex('snacks').select('*').where('user_id', userId)

        return reply.status(200).send({
            snaks
        })
    })

    app.get('/:id', {
        preHandler: [Auth]
    }, async (request, reply) => {
        const { userId } = request.cookies

        const paramsSchema = z.object({
            id: z.string()
        })

        const { id } = paramsSchema.parse(request.params)

        const snaks = await knex('snacks').select('*').where({
            user_id: userId,
            snack_id: id
        }).first()

        return reply.status(200).send({
            snaks
        })
    })

    app.put('/:id', {
        preHandler: [Auth]
    }, async (request, reply) => {
        const { userId } = request.cookies

        const paramsSchema = z.object({
            id: z.string()
        })

        const requestBodySchema = z.object({
            snack_name: z.string(),
            snack_description: z.string(),
            insideOroutside: z.enum(['inside', 'outside']),
        })

        const { id } = paramsSchema.parse(request.params)

        const {
            insideOroutside,
            snack_description,
            snack_name
        } = requestBodySchema.parse(request.body)

        await knex('snacks').update({
            insideOroutside,
            snack_description,
            snack_name,
            updated_at: knex.fn.now()
        }).where({
            user_id: userId,
            snack_id: id
        })

        return reply.status(204).send()
    })

    app.delete('/:id', {
        preHandler: [Auth]
    }, async (request, reply) => {
        const { userId } = request.cookies

        const paramsSchema = z.object({
            id: z.string()
        })

        const { id } = paramsSchema.parse(request.params)

        await knex('snacks').delete().where({
            user_id: userId,
            snack_id: id
        })

        return reply.status(204).send()
    })

    app.get('/metrics', {
        preHandler: [Auth]
    }, async (request, reply) => {
        const { userId } = request.cookies

        const totalSnacksInside = await knex('snacks').count('snack_id', { as: 'snacks'}).where({
            user_id: userId,
            insideOroutside: 'inside'
        }).first()

        const totalSnacksOutside = await knex('snacks').count('snack_id', { as: 'snacks'}).where({
            user_id: userId,
            insideOroutside: 'outside'
        }).first()

        const totalSnakcs = await knex('snacks').where({
            user_id: userId,
        }).orderBy('created_at', 'desc')

        const { bestOnDietSequence } = totalSnakcs.reduce((prev, next) => {
            
            if (next.insideOroutside === 'inside') {
                prev.currentSequence += 1
              } else {
                prev.currentSequence = 0
              }
    
              if (prev.currentSequence > prev.bestOnDietSequence) {
                prev.bestOnDietSequence = prev.currentSequence
              }
    
              return prev
        }, { bestOnDietSequence: 0, currentSequence: 0 })

        return reply.status(200).send({
            totalSnacks: totalSnakcs.length,
            insideDiet: totalSnacksInside?.snacks,
            outsideDiet: totalSnacksOutside?.snacks,
            bestSequence: bestOnDietSequence
        })
    })
}