export interface IBehavior {
  readonly name: string
  readonly key: string
}

export interface IEvent {
  readonly name: string
  readonly duration: number
  readonly startTime: number
  readonly endTime: number
}

export interface IOperatingSystem {
  readonly isMac: boolean
  readonly isWin: boolean
  readonly isLinux: boolean
}

export interface IRecording {
  readonly events: IEvent[]
  readonly recordingInfo: IRecordingInfo
}

export interface IRecordingInfo {
  readonly mouseId: string
  readonly runId: string
  readonly testName: string
  readonly testDate: string
  readonly maxRunTime: string
  readonly behaviors: IBehavior[]
}

export interface ISelection {
  readonly name: string
  readonly meta: IRecording
}
