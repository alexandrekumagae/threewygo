import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'

export async function getTotalVideoSizes (app: FastifyInstance) {
  const client = await pg.connect();

  app.get('/api/videos/total-video-size', async function(request, reply) {
    try {
      const result = await pg.query(
        `SELECT SUM(size) AS total_size FROM videos`,
      )

      if (result.rows.length === 0) {
        reply.status(500).send({ message: "Não foi possível retornar o tamanho total dos vídeos." })
      }

      const totalSize = result.rows[0].total_size;

      reply.status(200).send({ totalSize });      
    } catch (err) {
      return reply.status(500).send({ message: "Ocorreu um erro na solicitação." }) 
    } finally {
      await client.release();  
    }
  })
}

