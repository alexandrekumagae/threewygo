import React from 'react'

import { createBrowserRouter } from 'react-router-dom'

import App from './app'

import { CourseDetail } from './pages/course-detail'

import { Dashboard } from './pages/admin/dashboard'
import { CreateCourse } from './pages/admin/create-course'
import { EditCourse } from './pages/admin/edit-course'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:slug',
    element: <CourseDetail />,
  },
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '/admin/courses/new',
    element: <CreateCourse />,
  },
  {
    path: '/admin/courses/edit/:courseId',
    element: <EditCourse />,
  },
])
