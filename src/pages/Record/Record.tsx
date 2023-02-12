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
import styled from 'styled-components'

import { Legend } from '../../components'
import { useAPI, useRecordingInfo } from '../../contexts'
import { useRecordEvents } from '../../hooks'
import type { IEvent } from '../../types'
import { formatSeconds, formatTime } from '../../utils'

const Container = styled(Stack)`
  min-height: var(--content-height);
  max-height: var(--content-height);
`

const ListContainer = styled(Stack)`
  border: solid 1px ${({ theme }) => theme.palette.neutralLighter};
  min-height: 100%;
  overflow-x: hidden;
`

const COLUMNS: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    ariaLabel: 'The name of the event',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 100,
    onRender: ({ name }: IEvent) => <span>{name}</span>,
  },
  {
    key: 'duration',
    name: 'Duration',
    ariaLabel: 'The duration of the event',
    fieldName: 'duration',
    minWidth: 100,
    maxWidth: 100,
    onRender: ({ duration }: IEvent) => (
      <span>{formatSeconds(duration, 2)}s</span>
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
      <span>{formatTime(startTime, true)}</span>
    ),
  },
  {
    key: 'endTime',
    name: 'End Time',
    ariaLabel: 'The end time of the event',
    fieldName: 'endTime',
    minWidth: 100,
    maxWidth: 100,
    onRender: ({ endTime }: IEvent) => <span>{formatTime(endTime, true)}</span>,
  },
]

export default function Record() {
  const api = useAPI()
  const navigate = useNavigate()
  const { recordingInfo } = useRecordingInfo()
  const { currentEvent, events, isRunning, remaining, start } =
    useRecordEvents()

  const handleExportClick = useCallback(async () => {
    const id = crypto.randomUUID()
    const recordings = await api.getStoreValue('recordings')

    await api.setStoreValue('recordings', [
      ...recordings,
      {
        id,
        events,
        recordingInfo,
      },
    ])

    await api.openSaveCsvDialog({
      id,
      events,
      recordingInfo,
    })

    navigate('/recordings')
  }, [api, events, navigate, recordingInfo])

  const handleSaveClick = useCallback(async () => {
    const id = crypto.randomUUID()
    const recordings = await api.getStoreValue('recordings')

    await api.setStoreValue('recordings', [
      ...recordings,
      {
        id,
        events,
        recordingInfo,
      },
    ])

    navigate('/recordings')
  }, [api, events, navigate, recordingInfo])

  return (
    <Container grow tokens={{ childrenGap: 25 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLargePlus">Record Behaviors</Text>
        <Text variant="xxLargePlus">
          <code>{formatTime(remaining)}</code>
        </Text>
      </Stack>
      <Legend behaviors={recordingInfo.behaviors} currentEvent={currentEvent} />
      <ListContainer grow>
        <DetailsList
          items={events}
          columns={COLUMNS}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
          styles={{
            headerWrapper: {
              marginTop: -16,
            },
          }}
        />
      </ListContainer>
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
    </Container>
  )
}
