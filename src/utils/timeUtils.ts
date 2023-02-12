import { addMilliseconds, format } from 'date-fns'

export function formatSeconds(ms: number, fixed = 1) {
  const seconds = ms / 1000

  return seconds.toFixed(fixed)
}

export function formatTime(ms: number, addMS = false) {
  const date = addMilliseconds(new Date(0), ms)

  return format(date, addMS ? 'mm:ss.SS' : 'mm:ss')
}
