import { useLayoutEffect, useRef } from 'react'

import { Text, Stack } from '@fluentui/react'
import styled from 'styled-components'

import { displayPlaybackRate } from '../../utils'

const Container = styled(Stack)`
  position: relative;
`

const RateText = styled(Text)`
  font-weight: 600;
  position: absolute;
  color: #ffffff; // not using theme because we always want this to be white
  right: 10px;
  top: 5px;
`

const Video = styled.video`
  width: 100%;
`

interface IPlayerProps {
  readonly playbackRate: number
  readonly src: string
}

export default function Player({ playbackRate, src }: IPlayerProps) {
  const vidRef = useRef<HTMLVideoElement>()
  const srcRef = useRef<HTMLSourceElement>()

  useLayoutEffect(() => {
    if (srcRef.current != null && vidRef.current != null) {
      srcRef.current.src = src
      vidRef.current.load()
      vidRef.current.playbackRate = 0.75
    }
  }, [src])

  useLayoutEffect(() => {
    if (vidRef.current != null) {
      vidRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  return (
    <Container horizontalAlign="center" verticalAlign="center">
      <RateText variant="large">{displayPlaybackRate(playbackRate)}</RateText>
      {/* TODO: custom controls to prevent changing playback rate */}
      <Video
        ref={(el) => (vidRef.current = el)}
        controls
        controlsList="nofullscreen"
        muted
      >
        <source ref={(el) => (srcRef.current = el)} type="video/mp4" />
      </Video>
    </Container>
  )
}
