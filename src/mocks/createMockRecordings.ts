import type { IRecording } from '../types'

import { createMockEvents } from './createMockEvents'
import { createMockRecordingInfo } from './createMockRecordingInfo'

// sort by event name then startTime
// for each behavior, show total events and total time
// only check for updates on app load
// show modal when leaving record view without saving or exporting
// don't overwrite files when bulk exporting

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
    events: createMockEvents(eventCount),
    recordingInfo: createMockRecordingInfo(),
  }))
}
