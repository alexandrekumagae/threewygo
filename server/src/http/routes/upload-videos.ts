import { FastifyInstance } from 'fastify';

import fs from 'node:fs'
import { randomUUID } from 'node:crypto'
import { pipeline } from 'stream/promises'

import { pg } from '../../lib/postgres';
import z from 'zod';


export async function uploadVideos(app: FastifyInstance) {
  const client = await pg.connect();

  app.post('/api/courses/:courseId/videos', async function (request, reply) {
    try {
      const uploadVideoSchema = z.object({
        courseId: z.string().min(1)
      })
  
      const { courseId } = uploadVideoSchema.parse(request.params)
  
      const parts = request.files()
      
      for await (const part of parts) {
        const uuid = randomUUID()
        const fileName = `${uuid}_${part.filename}`;

        await pipeline(part.file, fs.createWriteStream(`./public/videos/${fileName}`));

        const stats = await fs.promises.stat(`./public/videos/${fileName}`);
        const fileSizeInMB = stats.size / (1024 * 1024);

        await pg.query(`
          INSERT INTO videos (name, path, size, course_id)
          VALUES ($1, $2, $3, $4)
        `, [part.filename, fileName, Math.round(fileSizeInMB), courseId])
      }

      reply.status(201).send({ message: 'Upload realizado com sucesso!' });
    } catch (error) {
      console.error('Error uploading files:', error);
      reply.code(500).send({ error: 'Internal server error' });
    } finally {
      await client.release();  
    }
  });
}
