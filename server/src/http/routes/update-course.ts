import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'

import z from 'zod'

export async function updateCourse (app: FastifyInstance) {
  const client = await pg.connect();

  app.put('/api/courses/:courseId', async function(request, reply) {
    const updateCourseSchema = z.object({
      title: z.string().min(3),
      slug: z.string().min(3),
      description: z.string().min(3),
      expiration_date: z.string()
    })

    const updateParamsCourseSchema = z.object({
      courseId: z.string().min(1)
    })

    const { title, slug, description, expiration_date } = updateCourseSchema.parse(request.body)

    const { courseId } = updateParamsCourseSchema.parse(request.params)

    try {
      const result = await pg.query(
        `UPDATE courses 
        SET title = $1, slug = $2, description = $3, expiration_date = $4 
        WHERE id = $5`,
        [title, slug, description, expiration_date, courseId]
      )

      if (result.rowCount === 0) {
        return reply.status(500).send({ message: "Não foi possível atualizar o curso." })
      }

      return reply.status(200).send({ id: result.rows[0] })
    } catch (err) {
      console.log('error', err)
      return reply.status(500).send({ message: "Ocorreu um erro na solicitação." }) 
    } finally {
      await client.release();  
    }
  })
}

