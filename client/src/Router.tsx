import React from 'react'
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

const About = React.lazy(() => import('./About'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: 'about',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    ),
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
