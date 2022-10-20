import { useEffect, useLayoutEffect, useRef } from 'react'

import { useKeyPress } from 'react-use'

interface IPlayerProps {
  readonly src: string
}

export default function Player({ src }: IPlayerProps) {
  const vidRef = useRef<HTMLVideoElement>()
  const srcRef = useRef<HTMLSourceElement>()

  useLayoutEffect(() => {
    if (srcRef.current != null && vidRef.current != null) {
      srcRef.current.src = src
      vidRef.current.load()
    }
  }, [src])

  const [pressed] = useKeyPress(' ')

  useEffect(() => {
    if (vidRef.current != null)
      vidRef.current.playbackRate = pressed ? 0.5 : 1.0
  }, [pressed])

  return (
    <video ref={(el) => (vidRef.current = el)} controls>
      <source ref={(el) => (srcRef.current = el)} type="video/mp4" />
    </video>
  )
}
