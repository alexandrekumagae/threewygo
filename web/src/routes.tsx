import { createBrowserRouter } from 'react-router-dom'

import App from './app'

import { CourseDetail } from './pages/course-detail'

import { Dashboard } from './pages/admin/dashboard'
import { CreateCourse } from './pages/admin/create-course'
import { EditCourse } from './pages/admin/edit-course'
import { NotFound } from './not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/curso/:slug',
    element: <CourseDetail />,
  },
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '/admin/cursos/novo',
    element: <CreateCourse />,
  },
  {
    path: '/admin/cursos/editar/:courseId',
    element: <EditCourse />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
