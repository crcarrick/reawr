import { useEffect, useMemo, useState } from 'react'

import { useKeyPressEvent } from 'react-use'
import { useTimer } from 'react-use-precision-timer'

import { useRecordingInfo } from '../../contexts'
import type { IEvent } from '../../types'

export function useRecordEvents() {
  const [events, setEvents] = useState<IEvent[]>([])
  const [currentEvent, setCurrentEvent] =
    useState<Pick<IEvent, 'name' | 'startTime'>>()

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

    if (isRunning()) timer = setTimeout(stop, maxDuration)

    return () => clearTimeout(timer)
  }, [maxDuration, isRunning, stop])

  useKeyPressEvent(
    ({ key }) => behaviors[key] != null,
    ({ key }) => {
      if (isRunning()) {
        setCurrentEvent({
          name: behaviors[key].name,
          startTime: getElapsedRunningTime(),
        })
      }
    },
    () => {
      if (isRunning()) {
        const duration = getElapsedRunningTime() - currentEvent.startTime
        const endTime = currentEvent.startTime + duration

        setEvents((prev) => [
          ...prev,
          {
            ...currentEvent,
            duration,
            endTime,
          },
        ])
      }
    }
  )

  // useKeyPressEvent(
  //   ({ key }) => BEHAVIORS[key] != null,
  //   ({ key }) => {
  //     if (isRunning()) {
  //       setCurrentEvent({
  //         name: BEHAVIORS[key].name,
  //         startTime: getElapsedRunningTime(),
  //       })
  //     }
  //   },
  //   () => {
  //     if (isRunning()) {
  //       const duration = getElapsedRunningTime() - currentEvent.startTime
  //       const endTime = currentEvent.startTime + duration

  //       setEvents((prev) => [
  //         ...prev,
  //         {
  //           ...currentEvent,
  //           duration,
  //           endTime,
  //         },
  //       ])
  //     }
  //   }
  // )

  return {
    events,
    isRunning: isRunning(),
    remaining: maxDuration - getElapsedRunningTime(),
    start,
  }
}
