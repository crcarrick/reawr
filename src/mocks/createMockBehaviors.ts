import type { IBehavior } from '../types'

export function createMockBehaviors(): Record<string, IBehavior> {
  return {
    r: {
      key: 'r',
      name: 'Rearing',
    },
    s: {
      key: 's',
      name: 'Sleeping',
    },
    f: {
      key: 'f',
      name: 'Fighting',
    },
  }
}
