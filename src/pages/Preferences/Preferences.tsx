import { useCallback } from 'react'

import { ChoiceGroup, PrimaryButton, Stack, Text } from '@fluentui/react'
import type { IChoiceGroupOption } from '@fluentui/react'

import { DangerButton } from '../../components'
import { useAPI, useTheme } from '../../contexts'

export enum ThemeMode {
  SYSTEM = 'system',
  DARK = 'dark',
  LIGHT = 'light',
}

const MODE_OPTIONS = [
  // ['Follow OS', ThemeMode.SYSTEM],
  ['Dark Mode', ThemeMode.DARK],
  ['Light Mode', ThemeMode.LIGHT],
]

export default function Preferences() {
  const api = useAPI()
  const { mode, setMode } = useTheme()

  const handleCheckForUpdatesClick = useCallback(() => api.getUpdates(), [api])

  const handleClearAllRecordingsClick = useCallback(
    () => api.setStoreValue('recordings', []),
    [api]
  )

  const handleModeChange = useCallback(
    (_event: React.FormEvent<HTMLInputElement>, value: IChoiceGroupOption) =>
      setMode(value.key as ThemeMode),
    [setMode]
  )

  return (
    <Stack tokens={{ childrenGap: 25 }}>
      <Text variant="xxLargePlus">Preferences</Text>
      <Stack tokens={{ childrenGap: 30 }}>
        <Stack tokens={{ maxWidth: 400 }}>
          <ChoiceGroup
            label="Theme"
            options={MODE_OPTIONS.map(([text, key]) => ({
              key,
              text,
            }))}
            selectedKey={mode}
            onChange={handleModeChange}
          />
        </Stack>
        <Stack tokens={{ maxWidth: 175 }}>
          <PrimaryButton onClick={handleCheckForUpdatesClick}>
            Check for updates
          </PrimaryButton>
        </Stack>
        <Stack tokens={{ maxWidth: 175 }}>
          <DangerButton onClick={handleClearAllRecordingsClick}>
            Clear all recordings
          </DangerButton>
        </Stack>
      </Stack>
    </Stack>
  )
}
