import type { IBehavior } from '../types'

export function createMockBehaviors(): IBehavior[] {
  return [
    {
      key: 'r',
      name: 'Rearing',
    },
    {
      key: 's',
      name: 'Sleeping',
    },
    {
      key: 'f',
      name: 'Fighting',
    },
  ]
}
