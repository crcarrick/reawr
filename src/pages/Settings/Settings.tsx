import { useCallback } from 'react'

import {
  ChoiceGroup,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
  Stack,
  Text,
  TooltipHost,
} from '@fluentui/react'
import type { IChoiceGroupOption } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'

import { DangerButton } from '../../components'
import { useAPI, useTheme } from '../../contexts'

export enum ThemeMode {
  SYSTEM = 'system',
  DARK = 'dark',
  LIGHT = 'light',
}

const MODE_OPTIONS = [
  // ['Follow OS', ThemeMode.SYSTEM],
  ['Dark', ThemeMode.DARK],
  ['Light', ThemeMode.LIGHT],
]

export default function Settings() {
  const api = useAPI()
  const [showDialog, { setTrue: setShowTrue, setFalse: setShowFalse }] =
    useBoolean(false)
  const { mode, setMode } = useTheme()

  const handleCheckForUpdatesClick = useCallback(() => api.getUpdates(), [api])

  const handleClearAllRecordingsClick = useCallback(async () => {
    await api.setStoreValue('recordings', [])
    setShowFalse()
  }, [api, setShowFalse])

  const handleModeChange = useCallback(
    (_event: React.FormEvent<HTMLInputElement>, value: IChoiceGroupOption) =>
      setMode(value.key as ThemeMode),
    [setMode]
  )

  return (
    <>
      <Stack tokens={{ childrenGap: 25 }}>
        <Text variant="xxLargePlus">Settings</Text>
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
            <DangerButton onClick={setShowTrue}>
              Clear all recordings
            </DangerButton>
          </Stack>
        </Stack>
      </Stack>

      <Dialog
        hidden={!showDialog}
        onDismiss={setShowFalse}
        dialogContentProps={{
          type: DialogType.normal,
          title: `Are you sure...`,
          subText: `Clear all recordings? This action is IRREVERSABLE.`,
        }}
      >
        <DialogFooter>
          <DangerButton onClick={handleClearAllRecordingsClick}>
            Clear
          </DangerButton>
          <DefaultButton onClick={setShowFalse}>Cancel</DefaultButton>
        </DialogFooter>
      </Dialog>
    </>
  )
}
