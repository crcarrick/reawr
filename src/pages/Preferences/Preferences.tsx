import { useCallback } from 'react'

import { ChoiceGroup, Stack, Text } from '@fluentui/react'
import type { IChoiceGroupOption } from '@fluentui/react'

import { useTheme } from '../../contexts'

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
  const { mode, setMode } = useTheme()

  const handleModeChange = useCallback(
    (_event: React.FormEvent<HTMLInputElement>, value: IChoiceGroupOption) =>
      setMode(value.key as ThemeMode),
    [setMode]
  )

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Text variant="xxLargePlus">Preferences</Text>
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
    </Stack>
  )
}
