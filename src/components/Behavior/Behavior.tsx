import { forwardRef, useCallback, useRef } from 'react'
import type { MutableRefObject } from 'react'

import { IconButton, Stack, TextField } from '@fluentui/react'
import type { ITextField } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'
import { useClickAway } from 'react-use'
import styled from 'styled-components'

import { Hotkey } from '../Hotkey'
import type { IBehavior } from '../../types'

interface IBehaviorProps {
  readonly readOnly?: boolean
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
  { onAdd, onChange, onDelete, readOnly, value }: IBehaviorProps,
  textFieldRef: MutableRefObject<ITextField>
) {
  const [binding, { setTrue: setBindingTrue, setFalse: setBindingFalse }] =
    useBoolean(false)
  const [hovered, { setTrue: setHoveredTrue, setFalse: setHoveredFalse }] =
    useBoolean(false)

  const keybindRef = useRef<HTMLDivElement>()

  useClickAway(keybindRef, setBindingFalse)

  const handleBindingKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (onChange != null && binding) {
        setBindingFalse()
        onChange({
          ...value,
          key: event.key,
        })
      }
    },
    [binding, value, onChange, setBindingFalse]
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
      onMouseEnter={setHoveredTrue}
      onMouseLeave={setHoveredFalse}
      tokens={{ childrenGap: 5 }}
    >
      <Stack grow horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
        <Stack grow>
          <TextField
            readOnly={readOnly}
            componentRef={textFieldRef}
            placeholder="Enter the name of the behavior..."
            onChange={handleNameChange}
            value={value.name}
          />
        </Stack>

        {readOnly ? (
          <Hotkey disabled={true} value={value.key} />
        ) : (
          <Hotkey
            ref={keybindRef}
            binding={binding}
            onClick={setBindingTrue}
            onKeyDown={handleBindingKeyDown}
            value={value.key}
          />
        )}
      </Stack>
      {readOnly ? (
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
