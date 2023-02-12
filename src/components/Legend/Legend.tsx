import { Stack } from '@fluentui/react'
import styled from 'styled-components'

import type { IBehavior } from '../../types'
import { translateKey } from '../../utils'

interface ILegendProps {
  readonly behaviors: Record<string, IBehavior>
  readonly recording: boolean
}

const Container = styled(Stack)`
  width: 100%;
  border: solid 1px ${({ theme }) => theme.palette.neutralLighter};
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Kbd = styled.kbd`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.neutralLight};
  border-radius: 1px;
  font-weight: bold;
  font-size: 12px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
`

const Name = styled.span`
  margin-right: 10px;
  font-weight: 400;
`

const RecordingIcon = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #f25022;
`

export default function Legend({ behaviors, recording }: ILegendProps) {
  return (
    <Container
      grow
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      tokens={{ padding: 10 }}
    >
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        {Object.values(behaviors).map(({ name, key }) => (
          <LegendItem key={key}>
            <Kbd>
              <Name>{name}</Name>
              {translateKey(key)}
            </Kbd>
          </LegendItem>
        ))}
      </Stack>
      {recording ? <RecordingIcon /> : null}
    </Container>
  )
}
