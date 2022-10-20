import { Stack } from '@fluentui/react'
import styled from 'styled-components'

import type { IBehavior } from '../../types'

interface ILegendProps {
  readonly behaviors: Record<string, IBehavior>
}

const Container = styled(Stack)``

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export default function Legend({ behaviors }: ILegendProps) {
  return (
    <Container tokens={{ childrenGap: 15, padding: 10, maxWidth: 300 }}>
      {Object.values(behaviors).map(({ name, key }) => (
        <Grid key={key}>
          <span>{name}</span>
          <b>{key.toUpperCase()}</b>
        </Grid>
      ))}
    </Container>
  )
}
