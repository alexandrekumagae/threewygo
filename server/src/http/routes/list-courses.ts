import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'

import z from 'zod';

export async function listCourses (app: FastifyInstance) {
  const client = await pg.connect();

  app.get('/api/courses', async function(request, reply) {
    try {
      const listCoursesSchema = z.object({
        filtro: z.enum(['nao-expirados']).optional()
      })

      const { filtro } = listCoursesSchema.parse(request.query)

      const currentDate = new Date().toISOString().split('T')[0]

      let query = `SELECT id, title, slug, description, expiration_date 
                   FROM courses`;
      if (filtro && filtro === 'nao-expirados') {
        query += ` WHERE expiration_date > $1`;
      }
      query += ` ORDER BY id DESC`;

      const result = await pg.query(query, filtro === 'nao-expirados' ? [currentDate] : []);

      return reply.send(result.rows)
    } catch (err) {
      return reply.status(500).send( {message: "Ocorreu um erro na solicitação."} ) 
    } finally {
      await client.release();  
    }
  })
}

