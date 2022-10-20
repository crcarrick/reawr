import { format } from 'date-fns'

import type { IRecordingInfo } from '../types'

const regexp =
  /^Run (\d+) - ID (\d+) - (.+) \((\d{1,2}-\d{1,2}-\d{1,2})\)\.mp4$/

export function parseVideoPath(
  path: string
): Pick<IRecordingInfo, 'runId' | 'mouseId' | 'testName' | 'testDate'> {
  const parts = path.split('/')
  const name = parts[parts.length - 1]

  const [, runId, mouseId, testName, testDate] = regexp.exec(name)

  return {
    runId,
    mouseId,
    testName,
    testDate: format(new Date(testDate), 'yyyy-MM-dd'),
  }
}
