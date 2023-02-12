import { useCallback, useEffect, useRef } from 'react'

interface IDelayedTimeoutCallback {
  (): void
}

interface IDelayedTimeout {
  readonly start: () => void
}

export function useDelayedTimeout(
  callback: IDelayedTimeoutCallback,
  delay: number
): IDelayedTimeout {
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  const tick = useRef<IDelayedTimeoutCallback>(callback)

  const start = useCallback(() => {
    timer.current = setTimeout(tick.current, delay)
  }, [delay])

  useEffect(() => {
    tick.current = callback
  }, [callback])

  useEffect(
    () => () => {
      clearTimeout(timer.current)
      tick.current()
    },
    []
  )

  return { start }
}
