import { useNavigate } from 'react-router'

import { PrimaryButton, Stack } from '@fluentui/react'

export function Error() {
  const navigate = useNavigate()

  return (
    <Stack horizontalAlign="center" verticalAlign="center">
      <PrimaryButton onClick={() => navigate('/')}>Back Home</PrimaryButton>
    </Stack>
  )
}
