import ExcelJS from 'exceljs'
import { uniqBy } from 'lodash'

import type { IRecording } from '../types'

import { formatTime } from './timeUtils'

export function createExcel({ events, recordingInfo }: IRecording) {
  const workbook = new ExcelJS.Workbook()

  const eventsSheet = workbook.addWorksheet('Events')
  const totalsSheet = workbook.addWorksheet('Totals')

  eventsSheet.columns = [
    { header: 'Run ID', key: 'runId' },
    { header: 'Mouse ID', key: 'mouseId' },
    { header: 'Test Name', key: 'testName' },
    { header: 'Test Date', key: 'testDate' },
    { header: 'Event Name', key: 'eventName' },
    { header: 'Start Time', key: 'startTime' },
    { header: 'End Time', key: 'endTime' },
    { header: 'Duration', key: 'duration' },
  ]

  totalsSheet.columns = [
    { header: 'Event Name', key: 'eventName' },
    { header: 'Total Events', key: 'totalEvents' },
    { header: 'Total Time', key: 'totalTime' },
  ]

  eventsSheet.addRows(
    events
      .sort((a, b) => a.name.localeCompare(b.name) || a.startTime - b.startTime)
      .map((event) => ({
        runId: recordingInfo.runId,
        mouseId: recordingInfo.mouseId,
        testName: recordingInfo.testName,
        testDate: new Date(recordingInfo.testDate),
        eventName: event.name,
        startTime: formatTime(event.startTime, true),
        endTime: formatTime(event.endTime, true),
        duration: event.duration / 1000,
      }))
  )

  const uniqueEvents = uniqBy(events, 'name').map(({ name }) => name)

  totalsSheet.addRows(
    uniqueEvents.map((eventName) => {
      const nameRange = `Events!E2:E${events.length + 1}`
      const durationRange = `Events!H2:H${events.length + 1}`

      return {
        eventName,
        totalEvents: {
          formula: `COUNTIF(${nameRange}, "${eventName}")`,
        },
        totalTime: {
          formula: `SUMIF(${nameRange}, "${eventName}", ${durationRange})`,
        },
      }
    })
  )

  return workbook
}
