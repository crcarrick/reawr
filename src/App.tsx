import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { registerIcons } from '@fluentui/react'
import {
  AddIcon,
  CancelIcon,
  CircleRingIcon,
  ClearIcon,
  DeleteIcon,
  ErrorBadgeIcon,
  ImportIcon,
  InfoIcon,
  PlayIcon,
  PauseIcon,
  SpecialEventIcon,
  StatusCircleCheckmarkIcon,
} from '@fluentui/react-icons-mdl2'
import { init as sentryInit } from '@sentry/electron/renderer'
import { init as reactSentryInit } from '@sentry/react'

import { AppProviders } from './contexts'
import { GlobalStyle } from './GlobalStyle'
import { router } from './router'

function render() {
  sentryInit({ debug: true }, reactSentryInit)

  registerIcons({
    icons: {
      Add: <AddIcon />,
      Cancel: <CancelIcon />,
      CircleRing: <CircleRingIcon />,
      Clear: <ClearIcon />,
      Delete: <DeleteIcon />,
      ErrorBadge: <ErrorBadgeIcon />,
      Import: <ImportIcon />,
      Info: <InfoIcon />,
      Play: <PlayIcon />,
      Pause: <PauseIcon />,
      SpecialEvent: <SpecialEventIcon />,
      StatusCircleCheckmark: <StatusCircleCheckmarkIcon />,
    },
  })

  createRoot(document.getElementById('root')).render(
    <AppProviders>
      <GlobalStyle />
      <RouterProvider router={router} />
    </AppProviders>
  )
}

render()
