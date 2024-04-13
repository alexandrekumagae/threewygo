import path from 'node:path'

import fastify from 'fastify'

import cors from '@fastify/cors'
import multipart from '@fastify/multipart'

import { listCourses } from './routes/list-courses'
import { getCourse } from './routes/get-course'
import { deleteCourse } from './routes/delete-course'
import { getTotalVideoSizes } from './routes/get-total-video-sizes'
import { createCourse } from './routes/create-course'
import { updateCourse } from './routes/update-course'
import { uploadVideos } from './routes/upload-videos'
import { deleteVideo } from './routes/delete-video'
import { getVideo } from './routes/get-video'

const app = fastify({
  logger: false
})

app.register(cors, {
  origin: '*',
})

app.register(multipart, {
  limits: {
    fileSize: 1000000 * 60, // 60 MB
  }
})

app.register(require('@fastify/static'), {
  root: path.join(__dirname, '..', '..', 'public'),
  prefix: '/public/',
})

app.register(listCourses)
app.register(getCourse)
app.register(createCourse)
app.register(updateCourse)
app.register(deleteCourse)

app.register(getTotalVideoSizes)
app.register(uploadVideos)
app.register(deleteVideo)

app.listen({ port: 3002, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server is running on http://localhost:3002 🔥.')
})
