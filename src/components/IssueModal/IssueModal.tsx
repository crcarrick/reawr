import React, { useCallback, useState } from 'react'

import { Modal, PrimaryButton, TextField } from '@fluentui/react'
import styled from 'styled-components'

import type { IIssue } from '../../types'
import { useAPI } from '../../contexts'

interface IFileIssueProps {
  readonly isOpen: boolean
  readonly onDismiss: () => void
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
  padding: 30px;
  width: 500px;
`

export default function FileIssue({ isOpen, onDismiss }: IFileIssueProps) {
  const [issue, setIssue] = useState<IIssue>({
    email: '',
    title: '',
    body: '',
  })

  const api = useAPI()

  const handleInputChange = useCallback(
    (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setIssue((prev) => ({
        ...prev,
        [fieldName]: event.target.value,
      })),
    []
  )

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (issue.title != null && issue.body != null) {
        await api.fileIssue(issue)

        onDismiss()
      }
    },
    [api, issue, onDismiss]
  )

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          placeholder="Enter your email..."
          onChange={handleInputChange('email')}
        />
        <TextField
          label="Title"
          placeholder="Enter the title..."
          onChange={handleInputChange('title')}
        />
        <TextField
          label="Description"
          placeholder="Enter the description"
          onChange={handleInputChange('body')}
          multiline
        />
        <PrimaryButton
          type="submit"
          disabled={!issue.email || !issue.title || !issue.body}
        >
          Submit
        </PrimaryButton>
      </Form>
    </Modal>
  )
}
