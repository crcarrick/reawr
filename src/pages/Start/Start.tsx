import React, { useCallback, useRef, useState } from 'react'

import {
  ActionButton,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from '@fluentui/react'
import type { ITextField } from '@fluentui/react'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'

import { Behavior } from '../../components'
import { useAPI, useRecordingInfo } from '../../contexts'
import type { IRecordingInfo } from '../../types'
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
  runId: Yup.string().required(),
  mouseId: Yup.string().required(),
  testName: Yup.string().required(),
  testDate: Yup.string().required(),
  maxRunTime: Yup.string().required(),
  behaviors: Yup.array().min(1),
})

export default function Start() {
  const currentBehaviorRef = useRef<ITextField>()
  const [formValues, setFormValues] = useState<IRecordingInfo>({
    runId: '',
    mouseId: '',
    testName: '',
    testDate: '',
    maxRunTime: '',
    behaviors: [{ key: '', name: '' }],
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
      ...parseVideoPath(path.base),
    }))
  }, [api])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (validationSchema.isValidSync(formValues)) {
        setRecordingInfo({
          ...formValues,
          // TODO: Should we just have a `currentBehavior` like the input did?
          behaviors: formValues.behaviors.filter(
            ({ key, name }) => key !== '' && name !== ''
          ),
        })
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
    <Stack tokens={{ childrenGap: 25 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLargePlus">Configure Run</Text>
        <ActionButton
          onClick={handleAutofillClick}
          iconProps={{ iconName: 'Import' }}
        >
          Autofill from video
        </ActionButton>
      </Stack>

      <Form onSubmit={handleSubmit}>
        <Text variant="large">Run Info</Text>
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

        <Text variant="large">Video Options</Text>
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

        <Text variant="large">Define Behaviors</Text>
        <HorizontalRule />

        <Section>
          <Grid>
            {/* TODO: Extract this into some component with an API that will work here */}
            <Stack tokens={{ childrenGap: 15 }}>
              {formValues.behaviors
                .slice(0, formValues.behaviors.length - 1)
                .map((behavior) => (
                  <Behavior
                    key={behavior.key}
                    disabled={true}
                    onDelete={() =>
                      setFormValues((prev) => ({
                        ...prev,
                        behaviors: prev.behaviors.filter(
                          (b) => b.key !== behavior.key
                        ),
                      }))
                    }
                    value={behavior}
                  />
                ))}
              <Behavior
                ref={currentBehaviorRef}
                onAdd={() => {
                  setFormValues((prev) => ({
                    ...prev,
                    behaviors: [...prev.behaviors, { key: '', name: '' }],
                  }))

                  currentBehaviorRef.current.focus()
                }}
                onChange={(value) =>
                  setFormValues((prev) => ({
                    ...prev,
                    behaviors: [
                      ...prev.behaviors.slice(0, prev.behaviors.length - 1),
                      value,
                    ],
                  }))
                }
                value={formValues.behaviors[formValues.behaviors.length - 1]}
              />
            </Stack>
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
