import { PrimaryButton, Stack, Text } from '@fluentui/react'
import { useNavigate, useRouteError } from 'react-router'
import styled from 'styled-components'

const Container = styled(Stack)`
  min-height: var(--content-height);
  max-height: var(--content-height);
`

const InnerContainer = styled(Stack)`
  max-width: 600px;
`

const ErrorContainer = styled.pre`
  background: ${({ theme }) => theme.palette.neutralLighter};
  overflow: hidden;
  padding: 15px;
  width: 100%;
`
const ErrorMessage = styled.code`
  font-size: 12px;
`

export function Error() {
  const navigate = useNavigate()
  const error = useRouteError() as Error

  return (
    <Container horizontalAlign="center" verticalAlign="center">
      <InnerContainer
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ childrenGap: 30 }}
      >
        <Text variant="superLarge">Oops! There was an error...</Text>
        <Text variant="large">
          Please report it with the following message and a description of what
          you were doing when it occurred:
        </Text>
        <ErrorContainer>
          <ErrorMessage>{error.stack}</ErrorMessage>
        </ErrorContainer>
        <PrimaryButton onClick={() => navigate('/')}>Back Home</PrimaryButton>
      </InnerContainer>
    </Container>
  )
}
