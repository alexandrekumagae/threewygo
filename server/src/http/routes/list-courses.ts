import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'

export async function listCourses (app: FastifyInstance) {
  const client = await pg.connect();

  app.get('/api/courses', async function(request, reply) {
    try {
      const currentDate = new Date().toISOString().split('T')[0]

      const result = await pg.query(
        `SELECT id, title, slug, description, expiration_date 
        FROM courses 
        WHERE DATE(expiration_date) > $1
        ORDER BY id DESC`,
        [currentDate]
      )
        
      return reply.send(result.rows)
    } catch (err) {
      console.log('error', err)
      return reply.status(500).send( {message: "Ocorreu um erro na solicitação."} ) 
    } finally {
      await client.release();  
    }
  })
}

