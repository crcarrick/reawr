import type { IRecording } from '../types'

import { createMockEvents } from './createMockEvents'
import { createMockRecordingInfo } from './createMockRecordingInfo'

interface ICreateMockRecordingOptions {
  readonly count?: number
  readonly duplicate?: boolean
  readonly eventCount?: number
}

export function createMockRecordings({
  count = 10,
  duplicate,
  eventCount,
}: ICreateMockRecordingOptions = {}): IRecording[] {
  if (duplicate) {
    return new Array(count).fill({
      events: createMockEvents(eventCount),
      recordingInfo: createMockRecordingInfo(),
    })
  }

  return new Array(count).fill(null).map(() => ({
    id: crypto.randomUUID(),
    events: createMockEvents(eventCount),
    recordingInfo: createMockRecordingInfo(),
  }))
}
