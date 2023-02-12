import { PrimaryButton, Stack, Text } from '@fluentui/react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

const Container = styled(Stack)`
  min-height: var(--content-height);
  max-height: var(--content-height);
`

const InnerContainer = styled(Stack)`
  max-width: 600px;
`

export function Error() {
  const navigate = useNavigate()

  return (
    <Container horizontalAlign="center" verticalAlign="center">
      <InnerContainer
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ childrenGap: 30 }}
      >
        <Text variant="superLarge">Oops! There was an error...</Text>
        <Text variant="large">
          Sorry about that! The error has been automatically submitted for
          review, so there&apos;s nothing else you need to do.
        </Text>
        <PrimaryButton onClick={() => navigate('/')}>
          Back to Start
        </PrimaryButton>
      </InnerContainer>
    </Container>
  )
}
