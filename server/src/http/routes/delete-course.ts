import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'

import z from 'zod'

export async function deleteCourse (app: FastifyInstance) {
  const client = await pg.connect();

  app.delete('/api/courses/:id', async function(request, reply) {
    const deleteCourseSchema = z.object({
      id: z.string().min(1)
    })

    const { id } = deleteCourseSchema.parse(request.params)

    try {
      const result = await pg.query(
        `DELETE FROM courses
        WHERE id = $1`,
        [id]
      )

      if (result.rowCount === 0) {
        return reply.status(500).send({ message: "Não foi possível excluir o curso." }) 
      }

      return reply.status(200).send({ message: "Curso excluído com sucesso!" })
    } catch (err) {
      return reply.status(500).send({ message: "Ocorreu um erro na solicitação." }) 
    }
  })
}

