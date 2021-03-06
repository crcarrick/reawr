import { createContext, useContext, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'

import type { IRecordingInfo } from '../../types'
interface IAppState {
  readonly recordingInfo: IRecordingInfo
  readonly setRecordingInfo: (info: IRecordingInfo) => void
}

const Context = createContext<IAppState>({
  recordingInfo: {
    runId: '',
    mouseId: '',
    testName: '',
    testDate: '',
    behaviors: [],
    maxRunTime: '',
  },
  setRecordingInfo: () => {},
})

export function Provider({ children }: PropsWithChildren) {
  const [recordingInfo, setRecordingInfo] = useState<IRecordingInfo>({
    runId: '',
    mouseId: '',
    testName: '',
    testDate: '',
    behaviors: [],
    maxRunTime: '',
  })

  const value = useMemo<IAppState>(
    () => ({
      recordingInfo,
      setRecordingInfo,
    }),
    [recordingInfo, setRecordingInfo]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useRecordingInfo = () => useContext(Context)
