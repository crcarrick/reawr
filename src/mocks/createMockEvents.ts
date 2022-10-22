import { faker } from '@faker-js/faker'

import type { IEvent } from '../types'

export function createMockEvents(count = 10): IEvent[] {
  return new Array(count)
    .fill(null)
    .map(() => {
      const name = faker.helpers.arrayElement([
        'Rearing',
        'Sleeping',
        'Fighting',
      ])
      const duration = faker.datatype.number({
        min: 100,
        max: 10 * 1000,
      })
      const startTime = faker.datatype.number({
        min: 100,
        max: 10 * 60 * 1000,
      })
      const endTime = startTime + duration

      return {
        name,
        duration,
        startTime,
        endTime,
      }
    })
    .sort((a, b) => a.startTime - b.startTime)
}
