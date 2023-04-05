import { useEffect, useMemo } from 'react'

import { useKeyPressEvent } from 'react-use'
import { useTimer } from 'react-use-precision-timer'

import { useRecordingInfo } from '../../contexts'
import { useRecordReducer } from './useRecordReducer'

export function useRecordEvents() {
  const { state, addCurrentEvent, setCurrentEvent } = useRecordReducer()

  const {
    recordingInfo: { behaviors, maxRunTime },
  } = useRecordingInfo()

  const { getElapsedRunningTime, isRunning, start, stop } = useTimer({
    delay: 100,
    startImmediately: false,
  })

  const maxDuration = useMemo(
    () => parseInt(maxRunTime, 10) * 1000,
    [maxRunTime]
  )

  // TODO: This is kinda sketchy
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (isRunning()) {
      timer = setTimeout(() => {
        addCurrentEvent({
          elapsed: getElapsedRunningTime(),
        })
        stop()
      }, maxDuration)
    }

    return () => clearTimeout(timer)
    // all these values are stable
  }, [addCurrentEvent, getElapsedRunningTime, maxDuration, isRunning, stop])

  useKeyPressEvent(
    ({ key }) => behaviors.find((behavior) => behavior.key === key) != null,
    ({ key }) => {
      if (isRunning()) {
        setCurrentEvent({
          name: behaviors.find((behavior) => behavior.key === key).name,
          startTime: getElapsedRunningTime(),
        })
      }
    },
    () => {
      if (isRunning()) {
        addCurrentEvent({
          elapsed: getElapsedRunningTime(),
        })
      }
    }
  )

  return {
    ...state,
    isRunning: isRunning(),
    remaining: maxDuration - getElapsedRunningTime(),
    start,
  }
}
