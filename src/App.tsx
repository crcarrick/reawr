import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { registerIcons } from '@fluentui/react'
import {
  AddIcon,
  CircleRingIcon,
  ClearIcon,
  DeleteIcon,
  ErrorBadgeIcon,
  ImportIcon,
  SpecialEventIcon,
  StatusCircleCheckmarkIcon,
} from '@fluentui/react-icons-mdl2'

import { AppProviders } from './contexts'
import { router } from './router'

function render() {
  registerIcons({
    icons: {
      Add: <AddIcon />,
      CircleRing: <CircleRingIcon />,
      Clear: <ClearIcon />,
      Delete: <DeleteIcon />,
      ErrorBadge: <ErrorBadgeIcon />,
      Import: <ImportIcon />,
      SpecialEvent: <SpecialEventIcon />,
      StatusCircleCheckmark: <StatusCircleCheckmarkIcon />,
    },
  })

  createRoot(document.getElementById('root')).render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}

render()
