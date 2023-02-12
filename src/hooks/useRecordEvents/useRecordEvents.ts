import { useEffect, useMemo, useState } from 'react'

import { useKeyPressEvent } from 'react-use'
import { useTimer } from 'react-use-precision-timer'

import { useRecordingInfo } from '../../contexts'
import type { IEvent } from '../../types'

export function useRecordEvents() {
  const [events, setEvents] = useState<IEvent[]>([])
  const [currentEvent, setCurrentEvent] = useState<
    Pick<IEvent, 'name' | 'startTime'>
  >({
    name: null,
    startTime: null,
  })

  const {
    recordingInfo: { behaviors, maxRunTime, playbackRate },
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

    if (isRunning()) timer = setTimeout(stop, maxDuration / playbackRate)

    return () => clearTimeout(timer)
  }, [maxDuration, playbackRate, isRunning, stop])

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
        const duration =
          (getElapsedRunningTime() - currentEvent.startTime) * playbackRate
        const startTime = currentEvent.startTime * playbackRate
        const endTime = startTime + duration

        setEvents((prev) => [
          ...prev,
          {
            ...currentEvent,
            duration,
            startTime,
            endTime,
          },
        ])
        setCurrentEvent({
          name: null,
          startTime: null,
        })
      }
    }
  )

  return {
    currentEvent,
    events,
    isRunning: isRunning(),
    remaining: maxDuration - getElapsedRunningTime() * playbackRate,
    start,
  }
}
