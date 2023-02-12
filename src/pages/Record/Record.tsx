import { useCallback, useMemo } from 'react'

import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  PrimaryButton,
  SelectionMode,
  Stack,
  Text,
} from '@fluentui/react'
import type { IColumn } from '@fluentui/react'
import { useNavigate } from 'react-router'
import { useUnmount } from 'react-use'
import styled from 'styled-components'

import { Legend, Player } from '../../components'
import { useAPI, useRecordingInfo } from '../../contexts'
import { useRecordEvents } from '../../hooks'
import type { IEvent, IRecording } from '../../types'
import { formatSeconds, formatTime } from '../../utils'

const Container = styled(Stack)`
  min-height: var(--content-height);
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

  const id = useMemo(() => crypto.randomUUID(), [])

  const save = useCallback(async () => {
    const recordings = await api.getStoreValue('recordings')
    const nextRecordings = [...recordings]
    const existingIndex = nextRecordings.findIndex(
      (recording) => recording.id === id
    )
    const currentRecording: IRecording = {
      id,
      events,
      recordingInfo,
    }

    if (existingIndex !== -1) {
      nextRecordings.splice(existingIndex, 1, currentRecording)
    } else {
      nextRecordings.push(currentRecording)
    }

    await api.setStoreValue('recordings', nextRecordings)
  }, [api, events, id, recordingInfo])

  useUnmount(async () => {
    await save()
  })

  const handleDoneClick = useCallback(async () => {
    await save()

    navigate('/recordings')
  }, [navigate, save])

  const handleExportClick = useCallback(async () => {
    await save()

    await api.openSaveCsvDialog({
      id,
      events,
      recordingInfo,
    })

    navigate('/recordings')
  }, [api, events, id, recordingInfo, navigate, save])

  return (
    <Container grow tokens={{ childrenGap: 25 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLargePlus">Record Behaviors</Text>
        <Text variant="xxLargePlus">
          <code>{formatTime(remaining)}</code>
        </Text>
      </Stack>
      <Legend behaviors={recordingInfo.behaviors} currentEvent={currentEvent} />
      {recordingInfo.showVideo ? (
        <Stack>
          <Player
            src={recordingInfo.videoPath}
            playbackRate={recordingInfo.playbackRate}
          />
        </Stack>
      ) : null}
      <ListContainer grow>
        <DetailsList
          items={events}
          columns={COLUMNS}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
          styles={{
            root: {
              minHeight: 300,
            },
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
            <PrimaryButton onClick={handleExportClick}>Export</PrimaryButton>
            <DefaultButton onClick={handleDoneClick}>Done</DefaultButton>
          </Stack>
        ) : null}
      </Stack>
    </Container>
  )
}
