import React, { useCallback, useState } from 'react'

import {
  ActionButton,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from '@fluentui/react'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'

import { BehaviorsInput } from '../../components'
import { useAPI, useRecordingInfo } from '../../contexts'
import type { IBehavior, IRecordingInfo } from '../../types'
import { parseVideoPath } from '../../utils'

const Section = styled(Stack)`
  flex: 1;
  padding: 15px 0;

  &:last-child {
    padding-bottom: 0;
  }
`

const Form = styled.form`
  gap: 15px;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
`

const Grid = styled.div`
  gap: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const HorizontalRule = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.themePrimary};
`

const validationSchema = Yup.object({
  runId: Yup.string().required('required'),
  mouseId: Yup.string().required('required'),
  testName: Yup.string().required('required'),
  testDate: Yup.string().required('required'),
  maxRunTime: Yup.string().required('required'),
  behaviors: Yup.object().test(
    'has-one-behavior',
    'required',
    (obj) => Object.keys(obj).length !== 0
  ),
})

export default function Start() {
  // const [error, setError] = useState<string>(null)
  const [formValues, setFormValues] = useState<IRecordingInfo>({
    runId: '',
    mouseId: '',
    testName: '',
    testDate: '',
    maxRunTime: '',
    behaviors: {},
  })

  const api = useAPI()
  const { setRecordingInfo } = useRecordingInfo()
  const navigate = useNavigate()

  const handleAutofillClick = useCallback(async () => {
    const {
      filePaths: [path],
    } = await api.openFileDialog()

    setFormValues((prev) => ({
      ...prev,
      ...parseVideoPath(path),
    }))
  }, [api])
  const handleBehaviorsFieldChange = useCallback(
    (behaviors: Record<string, IBehavior>) =>
      setFormValues((prev) => ({
        ...prev,
        behaviors,
      })),
    []
  )
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (validationSchema.isValidSync(formValues)) {
        setRecordingInfo(formValues)
        navigate('/record')
      } else {
        // TODO: Use error
      }
    },
    [formValues, navigate, setRecordingInfo]
  )
  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }))
    },
    []
  )

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Stack horizontalAlign="end">
        <ActionButton
          onClick={handleAutofillClick}
          iconProps={{ iconName: 'Import' }}
        >
          Autofill from video
        </ActionButton>
      </Stack>

      <Form onSubmit={handleSubmit}>
        <Text variant="xLarge">Run Info</Text>
        <HorizontalRule />

        <Section>
          <Grid>
            <TextField
              name="runId"
              label="Run ID"
              placeholder="Enter the id of the run..."
              value={formValues.runId}
              onChange={handleTextFieldChange}
              required
            />
            <TextField
              name="mouseId"
              label="Mouse ID"
              placeholder="Enter the id of the mouse..."
              value={formValues.mouseId}
              onChange={handleTextFieldChange}
              required
            />
            <TextField
              name="testName"
              label="Test Name"
              placeholder="Enter the name of the test..."
              value={formValues.testName}
              onChange={handleTextFieldChange}
              required
            />
            <TextField
              type="date"
              name="testDate"
              label="Test Date"
              placeholder="Enter the date of the test..."
              value={formValues.testDate}
              onChange={handleTextFieldChange}
              required
            />
          </Grid>
        </Section>

        <Text variant="xLarge">Video Options</Text>
        <HorizontalRule />

        <Section>
          <Grid>
            <TextField
              name="maxRunTime"
              label="Max Run Time (s)"
              placeholder="Enter the maximum run time in seconds"
              value={formValues.maxRunTime}
              onChange={handleTextFieldChange}
              required
            />
          </Grid>
        </Section>

        <Text variant="xLarge">Define Behaviors</Text>
        <HorizontalRule />

        <Section>
          <Grid>
            <BehaviorsInput onChange={handleBehaviorsFieldChange} />
          </Grid>
        </Section>

        <HorizontalRule />

        <Section horizontalAlign="end">
          <PrimaryButton type="submit" width="100px">
            Continue
          </PrimaryButton>
        </Section>
      </Form>
    </Stack>
  )
}
