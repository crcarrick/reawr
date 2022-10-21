import { forwardRef, useCallback, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'

import { Stack, TextField } from '@fluentui/react'
import type { ITextField } from '@fluentui/react'
import { useClickAway } from 'react-use'

import { Hotkey } from '../Hotkey'
import type { IBehavior } from '../../types'

interface IBehaviorProps {
  readonly disabled?: boolean
  readonly onChange?: (value: IBehavior) => void
  readonly value: IBehavior
}

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
          onClick={handleBindingClick}
          onKeyDown={handleBindingKeyDown}
          value={value.key}
        />
      )}
    </Stack>
  )
})
