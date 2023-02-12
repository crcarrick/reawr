import { useCallback } from 'react'

import {
  DetailsList,
  DetailsListLayoutMode,
  PrimaryButton,
  SelectionMode,
  Stack,
  Text,
} from '@fluentui/react'
import type { IColumn } from '@fluentui/react'
import { useNavigate } from 'react-router'

import { Legend } from '../../components'
import { useAPI, useRecordingInfo } from '../../contexts'
import { useRecordEvents } from '../../hooks'
import type { IEvent } from '../../types'
import { formatSeconds, formatTime } from '../../utils'

const COLUMNS: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    ariaLabel: 'The name of the event',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 100,
    onRender: ({ name }: IEvent) => <code>{name}</code>,
  },
  {
    key: 'duration',
    name: 'Duration',
    ariaLabel: 'The duration of the event',
    fieldName: 'duration',
    minWidth: 100,
    maxWidth: 100,
    onRender: ({ duration }: IEvent) => (
      <code>{formatSeconds(duration, 2)}s</code>
    ),
  },
  {
    key: 'startTime',
    name: 'Start Time',
    ariaLabel: 'The start time of the event',
    fieldName: 'startTime',
    minWidth: 100,
    maxWidth: 100,
    onRender: ({ startTime }: IEvent) => (
      <code>{formatTime(startTime, true)}</code>
    ),
  },
  {
    key: 'endTime',
    name: 'End Time',
    ariaLabel: 'The end time of the event',
    fieldName: 'endTime',
    minWidth: 100,
    maxWidth: 100,
    onRender: ({ endTime }: IEvent) => <code>{formatTime(endTime, true)}</code>,
  },
]

export default function Record() {
  const api = useAPI()
  const navigate = useNavigate()
  const { recordingInfo } = useRecordingInfo()
  const { events, isRunning, remaining, start } = useRecordEvents()

  const handleExportClick = useCallback(async () => {
    const recordings = await api.getStoreValue('recordings')

    await api.setStoreValue('recordings', [
      ...recordings,
      {
        events,
        recordingInfo,
      },
    ])

    await api.openSaveCsvDialog({
      events,
      recordingInfo,
    })

    navigate('/recordings')
  }, [api, events, navigate, recordingInfo])
  const handleSaveClick = useCallback(async () => {
    const recordings = await api.getStoreValue('recordings')

    await api.setStoreValue('recordings', [
      ...recordings,
      {
        events,
        recordingInfo,
      },
    ])

    navigate('/recordings')
  }, [api, events, navigate, recordingInfo])

  return (
    <Stack grow tokens={{ childrenGap: 15 }}>
      <Stack grow horizontalAlign="center">
        <Text variant="superLarge">
          <code>{formatTime(remaining)}</code>
        </Text>
      </Stack>
      <Legend behaviors={recordingInfo.behaviors} />
      <Stack grow>
        <DetailsList
          items={events}
          columns={COLUMNS}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
        />
      </Stack>
      <Stack horizontal horizontalAlign="end">
        {!isRunning && events.length === 0 ? (
          <PrimaryButton onClick={start}>Start</PrimaryButton>
        ) : null}
        {!isRunning && events.length > 0 ? (
          <Stack horizontal tokens={{ childrenGap: 5 }}>
            <PrimaryButton onClick={handleSaveClick}>Save</PrimaryButton>
            <PrimaryButton onClick={handleExportClick}>
              Save & Export
            </PrimaryButton>
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  )
}
