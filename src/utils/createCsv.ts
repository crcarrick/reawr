import { groupBy, sumBy } from 'lodash'

import type { IRecording } from '../types'

import { formatSeconds, formatTime } from './timeUtils'

const EVENT_COLUMNS = [
  'Run ID',
  'Mouse ID',
  'Test Name',
  'Test Date',
  'Event Name',
  'Start Time',
  'End Time',
  'Duration',
]

const TOTAL_COLUMNS = ['Event Name', 'Total Events', 'Total Time']

export function createCsv({ events, recordingInfo }: IRecording) {
  const eventRows = [
    EVENT_COLUMNS,
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
  ]

  const totalRows = [
    TOTAL_COLUMNS,
    ...Object.entries(groupBy(events, 'name')).map(([name, evts]) => {
      return [name, evts.length, formatSeconds(sumBy(evts, 'duration'))]
    }),
  ]

  return [...eventRows, '\n', ...totalRows].join('\n')
}
