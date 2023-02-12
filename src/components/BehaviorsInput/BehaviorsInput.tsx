import { useCallback, useEffect, useRef, useState } from 'react'

import { IconButton, Stack } from '@fluentui/react'
import type { ITextField } from '@fluentui/react'
import styled from 'styled-components'
import { useMap } from 'react-use'

import { Behavior } from '../Behavior'

import type { IBehavior } from '../../types'

interface IBehaviorsInputProps {
  readonly onChange: (value: Record<string, IBehavior>) => void
}

const IconPlaceholder = styled.div`
  width: 32px;
  height: 32px;
`

export default function BehaviorsInput({ onChange }: IBehaviorsInputProps) {
  const textFieldRef = useRef<ITextField>()
  const [hovered, setHovered] = useState('')
  const [behaviors, { set: setBehavior, remove: removeBehavior }] = useMap<
    Record<string, IBehavior>
  >({})
  const [currentBehavior, setCurrentBehavior] = useState<IBehavior>({
    name: '',
    key: '',
  })

  useEffect(() => {
    onChange(behaviors)
  }, [behaviors, onChange])

  const handleAddClick = useCallback(() => {
    setBehavior(currentBehavior.key, currentBehavior)
    setCurrentBehavior({
      name: '',
      key: '',
    })

    textFieldRef.current.focus()
  }, [currentBehavior, setBehavior])
  const handleCurrentBehaviorChange = useCallback(
    (behavior: IBehavior) => setCurrentBehavior(behavior),
    []
  )
  const handleDeleteClick = useCallback(
    (key: string) => removeBehavior(key),
    [removeBehavior]
  )
  const toggleHovered = useCallback((key: string) => () => setHovered(key), [])

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      {Object.values(behaviors).map((behavior) => (
        <Stack
          key={behavior.key}
          horizontal
          tokens={{ childrenGap: 5 }}
          onMouseEnter={toggleHovered(behavior.key)}
          onMouseLeave={toggleHovered('')}
        >
          <Behavior value={behavior} disabled />
          {hovered === behavior.key ? (
            <IconButton
              iconProps={{ iconName: 'Delete' }}
              onClick={() => handleDeleteClick(behavior.key)}
            />
          ) : (
            <IconPlaceholder />
          )}
        </Stack>
      ))}
      <Stack horizontal tokens={{ childrenGap: 5 }}>
        <Behavior
          ref={textFieldRef}
          onChange={handleCurrentBehaviorChange}
          value={currentBehavior}
        />
        <IconButton
          disabled={!currentBehavior.key || !currentBehavior.name}
          iconProps={{ iconName: 'Add' }}
          onClick={handleAddClick}
        />
      </Stack>
    </Stack>
  )
}
