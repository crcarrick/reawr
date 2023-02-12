import React, { useCallback, useMemo, useRef, useState } from 'react'

import {
  ActionButton,
  Dropdown,
  PrimaryButton,
  Slider,
  Stack,
  Text,
  TextField,
  Toggle,
} from '@fluentui/react'
import type { ITextField } from '@fluentui/react'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'

import { Behavior } from '../../components'
import { useAPI, useRecordingInfo } from '../../contexts'
import type { IBehavior, IRecordingInfo } from '../../types'
import {
  addMediaProtocol,
  displayPlaybackRate,
  parseVideoPath,
} from '../../utils'

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

function isValidBehavior({ key, name }: IBehavior) {
  return key !== '' && name !== ''
}

const validationSchema = Yup.object({
  runId: Yup.string().required(),
  mouseId: Yup.string().required(),
  testName: Yup.string().required(),
  testDate: Yup.string().required(),
  videoPath: Yup.string().when('showVideo', {
    is: true,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  maxRunTime: Yup.string().required(),
  showVideo: Yup.boolean().required(),
  playbackRate: Yup.number()
    .min(0.25)
    .max(2.0)
    .when('showVideo', {
      is: true,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema,
    }),
  behaviors: Yup.array().test('at-least-one-valid-behavior', (behaviors) =>
    behaviors.some(isValidBehavior)
  ),
})

export default function Start() {
  const currentBehaviorRef = useRef<ITextField>()
  const [formValues, setFormValues] = useState<IRecordingInfo>(() => ({
    runId: '',
    mouseId: '',
    testName: '',
    testDate: '',
    maxRunTime: '',
    videoPath: '',
    showVideo: false,
    playbackRate: 1.0,
    behaviors: [{ key: '', name: '' }],
  }))

  const api = useAPI()
  const { setRecordingInfo } = useRecordingInfo()
  const navigate = useNavigate()

  const readOnlyBehaviors = useMemo(
    () => formValues.behaviors.slice(0, formValues.behaviors.length - 1),
    [formValues]
  )
  const currentBehavior = useMemo(
    () => formValues.behaviors[formValues.behaviors.length - 1],
    [formValues]
  )

  const isValid = useMemo(
    () => validationSchema.isValidSync(formValues),
    [formValues]
  )

  const handleAutofillClick = useCallback(async () => {
    const result = await api.openFileDialog()
    const path = result?.filePaths[0]
    const parsed = await api.parsePath(path)
    const videoPath = addMediaProtocol(path)

    if (!path) return

    setFormValues((prev) => ({
      ...prev,
      ...parseVideoPath(parsed.base),
      videoPath,
      showVideo: true,
    }))
  }, [api])

  const handleBehaviorAdd = useCallback(() => {
    setFormValues((prev) => ({
      ...prev,
      behaviors: [...prev.behaviors, { key: '', name: '' }],
    }))

    currentBehaviorRef.current.focus()
  }, [])

  const handleBehaviorChange = useCallback(
    (value: IBehavior) =>
      setFormValues((prev) => ({
        ...prev,
        behaviors: [
          ...prev.behaviors.slice(0, prev.behaviors.length - 1),
          value,
        ],
      })),
    []
  )

  const handleBehaviorDelete = useCallback((key: string) => {
    setFormValues((prev) => ({
      ...prev,
      behaviors: prev.behaviors.filter((behavior) => behavior.key !== key),
    }))
  }, [])

  const handleShowVideoChange = useCallback(
    (_event: React.MouseEvent, value: boolean) => {
      setFormValues((prev) => ({
        ...prev,
        showVideo: value,
      }))
    },
    []
  )

  const handlePlaybackSpeedChange = useCallback((value: number) => {
    setFormValues((prev) => ({
      ...prev,
      playbackRate: value,
    }))
  }, [])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (validationSchema.isValidSync(formValues)) {
        setRecordingInfo({
          ...formValues,
          behaviors: formValues.behaviors.filter(isValidBehavior),
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
              placeholder="Enter the maximum run time in seconds..."
              value={formValues.maxRunTime}
              onChange={handleTextFieldChange}
              required
            />
            <Toggle
              label="Show Video"
              checked={formValues.showVideo}
              onChange={handleShowVideoChange}
            />
            {formValues.showVideo ? (
              <Slider
                label="Playback Speed"
                min={0.25}
                max={2.0}
                step={0.25}
                value={formValues.playbackRate}
                valueFormat={displayPlaybackRate}
                onChange={handlePlaybackSpeedChange}
                styles={{
                  titleLabel: {
                    padding: '5px 0',
                  },
                }}
              />
            ) : null}
          </Grid>
        </Section>

        <Text variant="large">Define Behaviors</Text>
        <HorizontalRule />

        <Section>
          <Grid>
            <Stack tokens={{ childrenGap: 15 }}>
              {readOnlyBehaviors.map((behavior) => (
                <Behavior
                  key={behavior.key}
                  readOnly={true}
                  onDelete={() => handleBehaviorDelete(behavior.key)}
                  value={behavior}
                />
              ))}
              <Behavior
                ref={currentBehaviorRef}
                onAdd={handleBehaviorAdd}
                onChange={handleBehaviorChange}
                value={currentBehavior}
              />
            </Stack>
          </Grid>
        </Section>

        <HorizontalRule />

        <Section horizontalAlign="end">
          <PrimaryButton disabled={!isValid} type="submit" width="100px">
            Continue
          </PrimaryButton>
        </Section>
      </Form>
    </Stack>
  )
}
