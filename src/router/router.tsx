import { createHashRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router'

import { Record, Recordings, Settings, Start } from '../pages'
import { Error } from './Error'
import { Layout } from './Layout'

function createRoute(route: Omit<RouteObject, 'errorElement'>): RouteObject {
  return {
    ...route,
    index: false,
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
      inNav: process.env.NODE_ENV === 'development',
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
    id: 'settings',
    path: '/settings',
    handle: {
      name: 'Settings',
      inNav: true,
    },
    element: <Settings />,
  }),
]

export const router = createHashRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: routes,
  },
])
