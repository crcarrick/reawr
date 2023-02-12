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
} from '@fluentui/react'
import type { IChoiceGroupOption } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'

import { DangerButton, IssueModal } from '../../components'
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
  const [shouldShowDialog, { setTrue: showDialog, setFalse: hideDialog }] =
    useBoolean(false)
  const [shouldShowIssue, { setTrue: showIssue, setFalse: hideIssue }] =
    useBoolean(false)
  const { mode, setMode } = useTheme()

  const handleCheckForUpdatesClick = useCallback(() => api.getUpdates(), [api])

  const handleClearAllRecordingsClick = useCallback(async () => {
    await api.setStoreValue('recordings', [])
    hideDialog()
  }, [api, hideDialog])

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
            <DangerButton onClick={showDialog}>
              Clear all recordings
            </DangerButton>
          </Stack>
          <Stack tokens={{ maxWidth: 175 }}>
            <DefaultButton onClick={showIssue}>Make a suggestion</DefaultButton>
          </Stack>
        </Stack>
      </Stack>

      <Dialog
        hidden={!shouldShowDialog}
        onDismiss={hideDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: `Are you sure...`,
          subText: `Clear all recordings? This action is IRREVERSIBLE.`,
        }}
      >
        <DialogFooter>
          <DangerButton onClick={handleClearAllRecordingsClick}>
            Clear
          </DangerButton>
          <DefaultButton onClick={hideDialog}>Cancel</DefaultButton>
        </DialogFooter>
      </Dialog>

      <IssueModal isOpen={shouldShowIssue} onDismiss={hideIssue} />
    </>
  )
}
