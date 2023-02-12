import type { IRecording } from '../types'

import { formatSeconds, formatTime } from './timeUtils'

const COLUMNS = [
  'Run ID',
  'Mouse ID',
  'Test Name',
  'Test Date',
  'Event Name',
  'Start Time',
  'End Time',
  'Duration',
]

export function createCsv({ events, recordingInfo }: IRecording) {
  return [
    COLUMNS,
    ...events
      .sort((a, b) => a.name.localeCompare(b.name) || a.startTime - b.startTime)
      .map((event) => [
        recordingInfo.runId,
        recordingInfo.mouseId,
        recordingInfo.testName,
        recordingInfo.testDate,
        event.name,
        formatTime(event.startTime, true),
        formatTime(event.endTime, true),
        formatSeconds(event.duration),
      ]),
  ].join('\n')
}
