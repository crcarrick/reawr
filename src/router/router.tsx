import { createHashRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router'

import { Preferences, Record, Recordings, Start } from '../pages'
import { Error } from './Error'
import { Layout } from './Layout'

function createRoute(route: Omit<RouteObject, 'errorElement'>): RouteObject {
  return {
    ...route,
    errorElement: <Error />,
  }
}

export const routes = [
  createRoute({
    id: 'home',
    path: '/',
    handle: {
      name: 'Start',
      inNav: true,
    },
    element: <Start />,
  }),
  createRoute({
    id: 'record',
    path: '/record',
    handle: {
      name: 'Record',
      inNav: false,
    },
    element: <Record />,
  }),
  createRoute({
    id: 'recordings',
    path: '/recordings',
    handle: {
      name: 'Recordings',
      inNav: true,
    },
    element: <Recordings />,
  }),
  createRoute({
    id: 'preferences',
    path: '/preferences',
    handle: {
      name: 'Preferences',
      inNav: true,
    },
    element: <Preferences />,
  }),
]

export const router = createHashRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: routes,
  },
])
