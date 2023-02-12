import { faker } from '@faker-js/faker'
import { format, sub } from 'date-fns'

import type { IRecordingInfo } from '../types'

import { createMockBehaviors } from './createMockBehaviors'

export function createMockRecordingInfo(): IRecordingInfo {
  return {
    behaviors: createMockBehaviors(),
    maxRunTime: faker.datatype
      .number({
        min: 60,
        max: 60 * 10,
      })
      .toString(),
    mouseId: faker.datatype.number({ min: 1, max: 50 }).toString(),
    runId: faker.datatype.number({ min: 1, max: 50 }).toString(),
    testDate: format(
      faker.datatype.datetime({
        min: sub(new Date(), { days: 30 }).getTime(),
        max: Date.now(),
      }),
      'yyyy-MM-dd'
    ),
    testName: faker.helpers.arrayElement(['Open Field', 'Barnes Maze']),
    videoPath: '',
    showVideo: false,
    playbackRate: 1.0,
  }
}
