import { forwardRef, useCallback, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'

import { IconButton, Stack, TextField } from '@fluentui/react'
import type { ITextField } from '@fluentui/react'
import { useClickAway } from 'react-use'
import styled from 'styled-components'

import { Hotkey } from '../Hotkey'
import type { IBehavior } from '../../types'

interface IBehaviorProps {
  readonly disabled?: boolean
  readonly onAdd?: () => void
  readonly onChange?: (value: IBehavior) => void
  readonly onDelete?: () => void
  readonly value: IBehavior
}

const IconPlaceholder = styled.div`
  width: 32px;
  height: 32px;
`

export default forwardRef(function Behavior(
  { disabled, onAdd, onChange, onDelete, value }: IBehaviorProps,
  textFieldRef: MutableRefObject<ITextField>
) {
  const [binding, setBinding] = useState(false)
  const [hovered, setHovered] = useState(false)

  const keybindRef = useRef<HTMLDivElement>()

  useClickAway(keybindRef, () => {
    setBinding(false)
  })

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
    <Stack
      horizontal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tokens={{ childrenGap: 5 }}
    >
      <Stack grow horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
        <Stack grow>
          <TextField
            readOnly={disabled}
            componentRef={textFieldRef}
            placeholder="Enter the name of the behavior..."
            onChange={handleNameChange}
            value={value.name}
          />
        </Stack>

        {disabled ? (
          <Hotkey disabled={true} value={value.key} />
        ) : (
          <Hotkey
            ref={keybindRef}
            binding={binding}
            onClick={() => setBinding(true)}
            onKeyDown={handleBindingKeyDown}
            value={value.key}
          />
        )}
      </Stack>
      {disabled ? (
        hovered ? (
          <IconButton iconProps={{ iconName: 'Delete' }} onClick={onDelete} />
        ) : (
          <IconPlaceholder />
        )
      ) : (
        <IconButton
          disabled={!value.key || !value.name}
          iconProps={{ iconName: 'Add' }}
          onClick={onAdd}
        />
      )}
    </Stack>
  )
})
