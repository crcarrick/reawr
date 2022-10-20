import { forwardRef, useCallback, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'

import { DefaultButton, PrimaryButton, Stack, TextField } from '@fluentui/react'
import type { ITextField } from '@fluentui/react'
import { useClickAway } from 'react-use'
import styled from 'styled-components'

import { translateKey } from '../../utils'
import type { IBehavior } from '../../types'

interface IBehaviorProps {
  readonly disabled?: boolean
  readonly onChange?: (value: IBehavior) => void
  readonly value: IBehavior
}

const Code = styled.code``
const KeyBindContainer = styled.div``

export default forwardRef(function Behavior(
  { disabled, onChange, value }: IBehaviorProps,
  textFieldRef: MutableRefObject<ITextField>
) {
  const [binding, setBinding] = useState(false)

  const keybindRef = useRef<HTMLDivElement>()

  useClickAway(keybindRef, () => {
    setBinding(false)
  })

  const handleBindingClick = useCallback(() => setBinding(true), [])
  const handleBindingKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (onChange != null && binding) {
        setBinding(false)
        onChange({
          ...value,
          key: event.key,
        })
      }
    },
    [binding, value, onChange]
  )
  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange != null) {
        onChange({
          ...value,
          name: event.target.value,
        })
      }
    },
    [value, onChange]
  )

  return (
    <Stack grow horizontal tokens={{ childrenGap: 5 }}>
      <Stack grow>
        <TextField
          readOnly={disabled}
          componentRef={textFieldRef}
          placeholder="Enter the name of the behavior..."
          onChange={handleNameChange}
          value={value.name}
        />
      </Stack>

      <KeyBindContainer onKeyDown={handleBindingKeyDown} ref={keybindRef}>
        {disabled ? (
          <PrimaryButton>
            <Code>{value.key ? translateKey(value.key) : 'key'}</Code>
          </PrimaryButton>
        ) : (
          <DefaultButton onClick={handleBindingClick}>
            <Code>{value.key ? translateKey(value.key) : 'key'}</Code>
          </DefaultButton>
        )}
      </KeyBindContainer>
    </Stack>
  )
})
