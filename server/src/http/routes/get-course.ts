import { FastifyInstance } from 'fastify'

import { pg } from '../../lib/postgres'

import z from 'zod'

export async function getCourse (app: FastifyInstance) {
  const client = await pg.connect();

  app.get('/api/courses/:slug', async function(request, reply) {
    const getCourseSchema = z.object({
      slug: z.string().min(3)
    })

    const { slug } = getCourseSchema.parse(request.params)

    try {
      const courseResult = await pg.query(
        `SELECT id, title, slug, description, expiration_date
        FROM courses 
        WHERE slug = $1`,
        [slug]
      )
      
      if (courseResult.rows.length === 0) {
        return reply.status(404).send({ message: "Curso não encontrado!" })
      }

      const courseId = courseResult.rows[0].id

      const videoResult = await pg.query(
        `SELECT id, name, path, size
        FROM videos
        WHERE course_id = $1`,
        [courseId]
      );      

      const course = courseResult.rows[0];
      const videos = videoResult.rows;
      
      course.videos = videos

      return reply.send({ course });
    } catch (err) {
      return reply.status(500).send( {message: "Ocorreu um erro na solicitação."} ) 
    }
  })
}

