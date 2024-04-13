import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'

import z from 'zod'

export async function createCourse (app: FastifyInstance) {
  const client = await pg.connect();

  app.post('/api/courses', async function(request, reply) {
    const createCourseSchema = z.object({
      title: z.string().min(3),
      slug: z.string().min(3),
      description: z.string().min(3),
      expiration_date: z.string()
    })

    const { title, slug, description, expiration_date } = createCourseSchema.parse(request.body)

    try {
      const result = await pg.query(
        `INSERT INTO courses (title, slug, description, expiration_date) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id`,
        [title, slug, description, expiration_date]
      )

      return reply.status(201).send({ course: result.rows[0] })
    } catch (err) {
      console.log('error', err)
      return reply.status(500).send( {message: "Ocorreu um erro na solicitação."} ) 
    } finally {
      await client.release();  
    }
  })
}

