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
  return recordings.map(({ events, recordingInfo }) => ({
    name: `Run ${recordingInfo.runId} - ID ${recordingInfo.mouseId} - ${recordingInfo.testName}`,
    date: recordingInfo.testDate,
    length: formatTime(parseInt(recordingInfo.maxRunTime, 10) * 1000),
    events: events.length,
    meta: {
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
  const [recordings] = useStateAsync(
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
      <Stack horizontalAlign="end">
        <PrimaryButton
          disabled={selections.length === 0}
          onClick={handleExportClick}
        >
          {selections.length > 1 ? 'Export All' : 'Export'}
        </PrimaryButton>
      </Stack>
    </Container>
  )
}
