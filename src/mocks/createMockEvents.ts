import { faker } from '@faker-js/faker'

import type { IEvent } from '../types'

// sort by event name then startTime ✅
// save behavior when navigating to /record if + wasn't clicked ✅
// only check for updates on app load ✅
// exporting duplicate filenames ✅
// delete recordings ✅
// for each behavior, show total events and total time
// auto save recording

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
