import { useCallback, useMemo, useState } from 'react'

import {
  DetailsList,
  DetailsListLayoutMode,
  PrimaryButton,
  Selection,
  Stack,
  Text,
} from '@fluentui/react'
import type { IColumn } from '@fluentui/react'
import styled from 'styled-components'

import { useAPI } from '../../contexts'
import { useStateAsync } from '../../hooks'
import type { IRecording, ISelection } from '../../types'
import { formatTime } from '../../utils'

const COLUMNS: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    ariaLabel: 'The name of the recording',
    fieldName: 'name',
    minWidth: 200,
    maxWidth: 200,
  },
  {
    key: 'date',
    name: 'Date',
    ariaLabel: 'The date of the recording',
    fieldName: 'date',
    minWidth: 100,
    maxWidth: 100,
  },
  {
    key: 'length',
    name: 'Length',
    ariaLabel: 'The length of the recording',
    fieldName: 'length',
    minWidth: 100,
    maxWidth: 100,
  },
  {
    key: 'events',
    name: 'Events',
    ariaLabel: 'The number of events',
    fieldName: 'events',
    minWidth: 100,
    maxWidth: 100,
  },
]

function createItems(recordings: IRecording[]) {
  return recordings.map(({ id, events, recordingInfo }) => ({
    name: `Run ${recordingInfo.runId} - ID ${recordingInfo.mouseId} - ${recordingInfo.testName}`,
    date: recordingInfo.testDate,
    length: formatTime(parseInt(recordingInfo.maxRunTime, 10) * 1000),
    events: events.length,
    meta: {
      id,
      events,
      recordingInfo,
    },
  }))
}

const Container = styled(Stack)`
  min-height: var(--content-height);
  max-height: var(--content-height);
`

const ListContainer = styled(Stack)`
  border: solid 1px ${({ theme }) => theme.palette.neutralLighter};
  min-height: 100%;
  overflow-x: hidden;
`

export default function Recordings() {
  const api = useAPI()

  const [selections, setSelections] = useState<ISelection[]>([])
  const [recordings, setRecordings] = useStateAsync(
    () => api.getStoreValue('recordings'),
    [],
    [api]
  )

  const items = useMemo(() => createItems(recordings), [recordings])
  const selection = useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => {
          setSelections(
            selection.getSelection().map((selection) => {
              const { name, meta } = selection as ISelection

              return { name, meta }
            })
          )
        },
      }),
    []
  )

  const handleDeleteClick = useCallback(() => {
    const filteredRecordings = recordings.filter(
      (recording) =>
        selections.find((selection) => selection.meta.id === recording.id) ==
        null
    )

    api.setStoreValue('recordings', filteredRecordings)

    setRecordings(filteredRecordings)
  }, [api, recordings, selections, setRecordings])

  const handleExportClick = useCallback(
    () => api.saveCsvs(selections),
    [api, selections]
  )

  return (
    <Container grow tokens={{ childrenGap: 25 }}>
      <Text variant="xxLargePlus">Recordings</Text>
      <ListContainer grow>
        <DetailsList
          items={items}
          columns={COLUMNS}
          selection={selection}
          layoutMode={DetailsListLayoutMode.justified}
          styles={{
            headerWrapper: {
              marginTop: -16,
            },
          }}
        />
      </ListContainer>
      <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 5 }}>
        <PrimaryButton
          disabled={selections.length === 0}
          onClick={handleDeleteClick}
        >
          Delete
        </PrimaryButton>
        <PrimaryButton
          disabled={selections.length === 0}
          onClick={handleExportClick}
        >
          Export
        </PrimaryButton>
      </Stack>
    </Container>
  )
}
